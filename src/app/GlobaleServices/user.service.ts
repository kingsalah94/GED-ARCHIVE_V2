import { Injectable } from '@angular/core';
import { environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {CustomHttpResponse} from "../Http-Response/Custom-http-response";
import {ChangePasswordComponent} from "../ArchiveManagement/Componants/change-password/change-password.component";
import {ChangePasswordRequest} from "../models/ChangePasswordRequest";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.backendHost;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse>{
    return  this.http.get<User[]>(`${this.host}/api/archive/user/list`);
  }
  public addUser(formData: FormData): Observable<any>{
    return  this.http.post<User>(`${this.host}/api/archive/user/add`,formData);
  }
  public updateUser(formData: FormData): Observable<any>{
    return  this.http.put<User>(`${this.host}/api/archive/user/update`,formData);
  }
  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return  this.http.get<CustomHttpResponse>(`${this.host}/api/archive/user/resetPassword/${email}`);
  }
  public changePassword(request:ChangePasswordRequest): Observable<any>{
    return  this.http.put(`${this.host}/api/archive/user/change-password`, request);
  }

  public updateProfilrImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse>{
    return  this.http.post<User>(`${this.host}/api/archive/user/updateProfileImage`,formData,
      {reportProgress: true,
      observe: 'events'
      });
  }
  public deleteUser(username: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return  this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/user/delete/${username}`);
  }
  public addUsersToLocalCache(users: User[] | HttpErrorResponse): void{
    localStorage.setItem('users',JSON.stringify(users));
  }
  public getUsersFromLocalCache(): User[] | null {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users);
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername',loggedInUsername);
    formData.append('firstName',user.firstName);
    formData.append('lastName',user.lastName);
    formData.append('username',user.username);
    formData.append('email',user.email);
    formData.append('role',user.role);
    formData.append('profileImage',profileImage);
    formData.append('isActive',JSON.stringify(user.active));
    formData.append('isNotLocked',JSON.stringify(user.notLocked));
    formData.append('firstLogin',JSON.stringify(user.firstLogin));
    formData.append('divisionId',user.divisionId);
    return formData;
  }

  public changeUserPasswordFormData( request: ChangePasswordRequest): FormData {
    const formData = new FormData();
    formData.append('username',request.username);
    formData.append('password',request.password);
    formData.append('newPassword',request.newPassword);
    formData.append('confirmNewPassword',request.confirmNewPassword);
    return formData;
  }

 /* public deleteUsers(userId: number): Observable<any> {
    return this.http.delete<User>(`${this.host}/api/archive/user/delete/${userId}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }*/

}
