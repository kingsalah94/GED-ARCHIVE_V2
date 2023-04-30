import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../GlobaleServices/user.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../../models/user";
import {NotificationType} from "../../../Enumerations/notification-type.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$= this.titleSubject.asObservable();
  public users!: User[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public fileName: string | undefined;
  public profileImage: File | undefined;
  public selectedUser: User = new User();
  private currentUsername!: string;
  currentUser: any;
  editUser = new User();
  keyword?: string;
  results?: any[];

  constructor(private http:HttpClient,private userService: UserService,private notificationService: NotificationService,private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
  }
  public changeTitle(title: string): void{
    this.titleSubject.next(title);
  }

  public getUsers(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.userService.getUsers().subscribe((response: User[] ) => {
        this.userService.addUsersToLocalCache(response);
        this.users = response;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  search() {
    this.http.get<any[]>(`/search/${this.keyword}`).subscribe(
      results => this.results = results,
      error => console.error(error)
    );
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }
}
