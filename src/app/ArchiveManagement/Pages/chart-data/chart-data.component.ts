import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Chart} from "chart.js";
import {ChartData} from "../../../models/ChartData";
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/user";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {BehaviorSubject, Subscription} from "rxjs";
import {Divisions} from "../../../models/Divisions";
import {DivisionService} from "../../../GlobaleServices/Division/division.service";
import {UserService} from "../../../GlobaleServices/user.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {SubSink} from "subsink";

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css']
})
export class ChartDataComponent implements OnInit, OnDestroy{
  data:any;
  private host = environment.backendHost;
  private subs = new SubSink();
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
  selectedButton: string = '';
  public showLoading: boolean | undefined;
  public division!: Divisions[];
  divisions: Divisions = new Divisions();

  private a!: number;


  constructor(private http:HttpClient,
              private divisionService:DivisionService,
              private userService: UserService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
  this.getUsers(true);
  }

  chartOptions = {
    title: {
      text: "Archives Chart Data"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Document",  y: 10  },
        { label: "Dossier", y: 15  },
        { label: "boite", y: 25  },
        { label: "Emprunt",  y: 30  },
        { label: "Users",  y: 70  }
      ]
    }]
  };

  public getUsers(shwNotification: Boolean): void{
    this.refreshing = true;
    this.subs.add(
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
      ));
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }

  ngOnDestroy(): void {
  }
}
