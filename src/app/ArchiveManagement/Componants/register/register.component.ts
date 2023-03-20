import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {User} from "../../../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationType} from "../../../Enumerations/notification-type.enum";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy{
  public showLoading: boolean | undefined;
  private subscription : Subscription[] = [];
  user?: User;

  constructor(private router : Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }
  }

public onRegister(user:User): void{
    this.showLoading = true;
      this.authenticationService.register(user).subscribe({
        next: response => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS,`A new account was created for ${response.body?.firstName}.
          Please check your email for password to log in`);

        },
      error: (errorResponse: HttpErrorResponse) =>{
          this.sendNotification(NotificationType.ERREUR, errorResponse.error.message);
          this.showLoading = false;
      }
      });
}

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
