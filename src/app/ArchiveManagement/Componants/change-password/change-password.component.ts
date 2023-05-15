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

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  user!: User;
  currentUser!: User;
  showLoading: boolean = false;
  request!:ChangePasswordRequest;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];

  constructor(private userService: UserService,private notificationService: NotificationService,private authenticateService:AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticateService.getUserFromLocalCache();
  }

  onChangePassword(request:ChangePasswordRequest): void {
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
  }


  public onResetPassword(requestForm: NgForm): void{
    this.refreshing = true;
    //const emailAddress = emailForm.value['reset-password-email'];
    const formData = this.userService.changeUserPasswordFormData( requestForm.value);
    // @ts-ignore
    this.subscription.push(this.userService.changePassword(formData).subscribe({
      next: (response: CustomHttpResponse)=>{
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.refreshing = false;
        //emailForm.reset();
      },
      error: err => {
        this.sendNotification(NotificationType.WARNING, err.error.messages);
        this.refreshing = false;
      }
    }))
  }


  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }
}
