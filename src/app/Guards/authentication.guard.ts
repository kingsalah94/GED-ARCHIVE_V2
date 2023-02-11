import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../GlobaleServices/authentication.service";
import {NotificationService} from "../GlobaleServices/notification.service";
import {NotificationType} from "../Enumerations/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,private notificationService:NotificationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean{
    if(this.authenticationService.isUserLoggedIn()){

    }
    this.router.navigate(['/login'])
    this.notificationService.notifyShow(NotificationType.ERREUR,
      'You need to log in to access this page'.toUpperCase());
    return false;
  }

}
