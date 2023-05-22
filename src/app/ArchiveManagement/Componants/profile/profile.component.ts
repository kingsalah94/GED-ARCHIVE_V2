import {Component} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UserService} from "../../../GlobaleServices/user.service";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {NgForm} from "@angular/forms";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {Router} from "@angular/router";
import {FileUploadStatus} from "../../../models/File-upload.status";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$= this.titleSubject.asObservable();
  public users!: User[] ;
  public currentUser!:User
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public fileName: string | undefined;
  public profileImage!: File ;
  public selectedUser: User = new User();
  private currentUsername!: string;
  //currentUser: any;
  editUser = new User();
  profilImageInput: any;
  public fileStatus = new FileUploadStatus();
  constructor(private router:Router,
              private userService: UserService,
              private notificationService: NotificationService,private authenticationService: AuthenticationService) {
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

  onUpdateProfileImage(): void {
    const formData = new FormData();
    formData.append('username', this.currentUser.username);
    formData.append('profileImage', this.profileImage);
    this.subscription.push(this.userService.updateProfileImage(formData).subscribe({
      next: (events: HttpEvent<any>) => {
        this.reportUploadProgress(events);
      },
      error: (e) => {
        this.sendNotification(NotificationType.ERROR, e.message);
        this.fileStatus.status = 'done ';
      }
    }));
  }

  private reportUploadProgress(events: HttpEvent<any>) {
    switch (events.type) {
      case HttpEventType.UploadProgress:
        // @ts-ignore
        this.fileStatus.percentage= Math.round(100 * events.loaded / events.total);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (events.status === 200){
          this.currentUser.profileImageUrl = `${events.body.profileImageUrl}?time=${new Date().getTime()}`;
          this.sendNotification(NotificationType.SUCCESS, `${events.body.firstName}\'s profile Image Updated Successfully`);
          this.fileStatus.status = 'done';
          break;
        }else {
          this.sendNotification(NotificationType.ERROR, `Unable to upload image Please try again`);
          break;
        }
      default:
        `Finished all peocesses`;
    }
  }
  handleProfileImageChange(event: any): void {
    const fileName: string = event.target.files[0].name;
    const profileImage: File = event.target.files[0];
    this.profileImage = profileImage;
    this.onUpdateProfileImage();
    this.refreshing=true;
    console.log(fileName, profileImage);
  }
  updateProfileImage(): void {
    this.clickButton(`#profile-image-input`);
  }




  public onUpdateUser(): void {
    // @ts-ignore
    const formData = this.userService.createUserFormData(this.currentUsername, this.editUser, this.profileImage);
    this.subscription.push(this.userService.updateUser(formData).subscribe({
      next: (response: User)=>{
        this.clickButton('#edit-user-close');
        this.getUsers(false);
        // @ts-ignore
        this.fileName = "";
        // @ts-ignore
        this.profileImage = "";
        this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
        this.refreshing=true;
        // @ts-ignore
        this.profileImage=""
      }
    }));
  }





  public onUpdateCurrentUser(user: User): void{
    this.refreshing=true;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    // @ts-ignore
    const formData = this.userService.createUserFormData(this.currentUsername, user, this.profileImage);
    this.subscription.push(this.userService.updateUser(formData).subscribe({
      next: (response: User)=>{
        this.authenticationService.addUserToLocalCache(response);
        this.getUsers(false);
        // @ts-ignore
        this.fileName = "";
        // @ts-ignore
        this.profileImage = "";
        this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }




  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }

  private clickButton(buttonId: string): void {
    const button = document.querySelector(buttonId) as HTMLButtonElement;
    button.click();
  }


  onLogOut() {
    this.authenticationService.logOut();
    this.router.navigateByUrl("/login").then(r => {})
    this.sendNotification(NotificationType.SUCCESS, `You have been successfully logged out`)
  }
}
