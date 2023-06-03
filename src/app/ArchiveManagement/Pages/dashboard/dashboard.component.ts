import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {UserService} from "../../../GlobaleServices/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user!:User;
  constructor(private router : Router,
              private authenticationService: AuthenticationService,
              private userService:UserService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authenticationService.getUserFromLocalCache();
    if (this.authenticationService.isUserLoggedIn()){
      if ((this.authenticationService.getUserFromLocalCache().firstLogin)) {
        this.router.navigateByUrl('/dashboard/user/change-password');

      }else {
        this.router.navigateByUrl('/dashboard');
      }
    }
  }

}
