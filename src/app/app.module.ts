import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationService} from "./GlobaleServices/authentication.service";
import {UserService} from "./GlobaleServices/user.service";
import {AuthInterceptor} from "./HttpInterceptors/auth.interceptor";
import {AuthenticationGuard} from "./Guards/authentication.guard";
import {NotificationModule} from "./Notifications/notification.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [AuthenticationGuard ,AuthenticationService, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

