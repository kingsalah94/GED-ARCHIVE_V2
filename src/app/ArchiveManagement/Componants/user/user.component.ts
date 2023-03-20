import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UserService} from "../../../GlobaleServices/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {NgForm} from "@angular/forms";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

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
  constructor(private userService: UserService,private notificationService: NotificationService,private authenticationService: AuthenticationService) {
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
        this.sendNotification(NotificationType.ERREUR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('#openUserInfo');

  }

  public onProfileImageChange(fileName: string, profileImage: File): void{
    this.fileName = fileName;
    this.profileImage = profileImage;

  }

  handleProfileImageChange(event: any): void {
    const fileName: string = event.target.files[0].name;
    const profileImage: File = event.target.files[0];
    this.onProfileImageChange(fileName, profileImage);
    console.log(fileName, profileImage,)
  }

  saveNewUser(): void {
    this.clickButton('#new-user-save');
  }

  public onAddNewUser(userForm: NgForm):void{
   // @ts-ignore
    const formData = this.userService.createUserFormData(null, userForm.value, this.profileImage);
    this.subscription.push(this.userService.addUser(formData).subscribe({
      next: (response: User)=>{
       this.clickButton('#new-user-close');
       this.getUsers(false);
       // @ts-ignore
        this.fileName = "";
       // @ts-ignore
        this.profileImage = "";
        userForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} Added Successfully`)
      },
      error: (e)=> {
        console.error(e);
          this.sendNotification(NotificationType.ERREUR, e.message);
      }
    }));
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
        this.sendNotification(NotificationType.ERREUR, e.message);
      }
    }));
  }

  public searchUsers(keyword: string): void{
    const results: User[] = [];
    // @ts-ignore
    for (const user of  this.userService.getUsersFromLocalCache()){
      if (user.firstName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        user.lastName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1||
        user.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        user.userId.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.users = this.userService.getUsersFromLocalCache();
    }
  }

  public onEditUser(editUser: User): void{
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    this.clickButton('#openUserEdit');
  }

  public onResetPassword(emailForm: NgForm): void{
    this.refreshing = true;
    const emailAddress = emailForm.value['reset-password-email'];
    // @ts-ignore
    this.subscription.push(this.userService.resetPassword(emailAddress).subscribe({
      next: (response: CustomHttpResponse)=>{
        this.sendNotification(NotificationType.SUCCESS, response.message);
        this.refreshing = false;
        emailForm.reset();
      },
      error: err => {
        this.sendNotification(NotificationType.WARNING, err.error.messages);
        this.refreshing = false;
      }
    }))
  }

  public onDeleteUser(userId: number): void{
    let conf = confirm("Etes-Vous sur de continuer ???");
    if (!conf) return;
    // @ts-ignore
    this.subscription.push(this.userService.deleteUser(userId).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(true);
        },
      error: err => {
          this.sendNotification(NotificationType.ERREUR, err.error.messages);
      }
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

  private clickButton(buttonId: string): void {
    const button = document.querySelector(buttonId) as HTMLButtonElement;
    button.click();
  }


  onLogOut() {

  }
}
