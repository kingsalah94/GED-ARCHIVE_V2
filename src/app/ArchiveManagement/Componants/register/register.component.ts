import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {User} from "../../../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {DivisionService} from "../../../GlobaleServices/Division/division.service";
import {Divisions} from "../../../models/Divisions";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy{
  public showLoading: boolean | undefined;
  private subscription : Subscription[] = [];
  user: User = new User();
  division!: Divisions[];
  divisions: Divisions = new Divisions();
  private refreshing!: boolean;

  constructor(private router : Router,
              private divisionService: DivisionService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    this.getDivision(true);
    /*if (this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }*/

  }

public onRegister(user:User): void{
    this.showLoading = true;
      // @ts-ignore
  this.authenticationService.register(user).subscribe({
        next: response => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS,`A new account was created for ${response.body?.firstName}.
          Please check your email for password to log in`);
        },
      error: (errorResponse: HttpErrorResponse) =>{
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
      }
      });
}

  public getDivision(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.divisionService.getDivisions().subscribe((response: Divisions[] ) => {

        this.division = response;
        this.refreshing = false;

      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
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
