import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {HeaderType} from "../../../Enumerations/header-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  public showLoading: boolean | undefined;
  private subscription : Subscription[] = [];

  constructor(private router : Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }else {
      this.router.navigateByUrl('/login');
    }
  }



  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscription.push(this.authenticationService.login(user).subscribe({
        next:  (response: HttpResponse<User> | HttpErrorResponse) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          if (!(response instanceof HttpErrorResponse)) {
            this.authenticationService.addUserToLocalCache(response.body);
          }
          this.router.navigateByUrl('/dashboard');
          this.showLoading = false;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      })
    );

  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
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
