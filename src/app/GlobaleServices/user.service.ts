import { Injectable } from '@angular/core';
import { environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {JwtHelperService, JwtInterceptor} from "@auth0/angular-jwt";
import {CustomHttpResponse} from "../Http-Response/Custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.backendHost;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse>{
    return  this.http.get<User[]>(`${this.host}/user/list`);
  }
  public addUser(formData: FormData): Observable<any>{
    return  this.http.post<User>(`${this.host}/user/add`,formData);
  }
  public updateUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return  this.http.put<User>(`${this.host}/user/update`,formData);
  }
  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return  this.http.get<CustomHttpResponse>(`${this.host}/user/resetPassword/${email}`);
  }

  public updateProfilrImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse>{
    return  this.http.post<User>(`${this.host}/user/updateProfileImage`,formData,
      {reportProgress: true,
      observe: 'events'
      });
  }
  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse>{
    return  this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }
  public addUsersToLocalCache(users: User[]): void{
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
    formData.append('isNomLocked',JSON.stringify(user.notLocked));
    return formData;
  }

 /* public deleteUsers(userId: number): Observable<any> {
    return this.http.delete<User>(`${this.host}/user/delete/${userId}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }*/

}
