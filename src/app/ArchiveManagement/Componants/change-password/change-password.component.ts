import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../GlobaleServices/user.service";
import {User} from "../../../models/user";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {ChangePasswordRequest} from "../../../models/ChangePasswordRequest";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  user!: User;
  currentUser!: User;
  showLoading: boolean = false;
  request!:ChangePasswordRequest[];
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];

  constructor(private userService: UserService,
              private router:Router,
              private notificationService: NotificationService,
              private authenticateService:AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticateService.getUserFromLocalCache();
  }

 /* onChangePassword(request:ChangePasswordRequest): void {
    this.showLoading = true;
    const newPassword: string = ""; // Remplacez par le mot de passe saisi par l'utilisateur
    this.userService.changePassword(request).subscribe({
      next: (response: CustomHttpResponse) => {
        // Gérer la réponse de l'API
        this.showLoading = false;

      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs
        this.showLoading = false;
      }
    });
  }*/


  public onResetPassword(requestForm: NgForm): void{
    this.refreshing = true;
    //const formData = this.userService.changeUserPasswordFormData( requestForm.value);
    this.subscription.push(this.userService.changePassword(this.request=requestForm.value).subscribe({
      next: (response: ChangePasswordRequest)=>{
        this.sendNotification(NotificationType.SUCCESS, "Your password is updated successfully!!!");
        this.refreshing = false;
        requestForm.reset();
        this.router.navigateByUrl('/dashboard');

      },
      error: err => {
        this.sendNotification(NotificationType.WARNING, err.error.messages);
        this.refreshing = false;
      }
    }))
  }


  onLogOut() {
    this.authenticateService.logOut();
    this.router.navigateByUrl("/login").then(r => {})
    this.sendNotification(NotificationType.SUCCESS, `You have been successfully logged out`)
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }
}
