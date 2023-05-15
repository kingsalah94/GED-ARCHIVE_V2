import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router : Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()){
      if (!(this.authenticationService.getUserFromLocalCache().firstLogin)) {
        this.router.navigateByUrl('/dashboard/user/change-password')
      }else {
        this.router.navigateByUrl('/dashboard');
      }
    }else {
      this.router.navigateByUrl('/login');
    }
  }

}
