import { Injectable } from '@angular/core';
import { environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {JwtHelperService, JwtInterceptor} from "@auth0/angular-jwt";

const AUTH_API = 'http://localhost:8086'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.backendHost;
  public token?: string | null;
  public loggedInUsername?: string | null;
  public jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.host}/api/archive/user/login`,user,{ observe: 'response' });
  }
  public register(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>
    (`${this.host}/api/archive/user/register`,user,{observe:'response'});
  }public add(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>
    (`${this.host}/api/archive/user/add`,user,{observe:'response'});
  }
  public logOut(): void{
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string | null): void{
    this.token = token;
    if (typeof token === "string") {
      localStorage.setItem('token', token);
    }
  }

  public addUserToLocalCache(user: User | null): void{
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUserFromLocalCache(): User{
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));

  }

  public loadToken(): void{
    this.token = localStorage.getItem('token');
  }
  public getToken(): string{
    return <string>this.token;
  }
  /*public isloggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== ''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if(this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else {
      this.logOut();
      return false;
    }
  }*/
  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token && this.jwtHelper.decodeToken(this.token).sub) {
      if (this.jwtHelper.isTokenExpired(this.token)) {
        this.logOut();
        return false;
      } else {
        this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
        return true;
      }
    } else {
      this.logOut();
      return false;
    }
  }

}
