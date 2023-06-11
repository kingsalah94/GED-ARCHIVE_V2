import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationService} from "./GlobaleServices/authentication.service";
import {UserService} from "./GlobaleServices/user.service";
import {AuthInterceptor} from "./HttpInterceptors/auth.interceptor";
import {AuthenticationGuard} from "./Guards/authentication.guard";
import {NotificationModule} from "./notification.module";
import { LoginComponent } from './ArchiveManagement/Componants/login/login.component';
import { RegisterComponent } from './ArchiveManagement/Componants/register/register.component';
import { UserComponent } from './ArchiveManagement/Componants/user/user.component';
import { MenuComponent } from './ArchiveManagement/Componants/menu/menu.component';
import { FooterComponent } from './ArchiveManagement/Componants/footer/footer.component';
import { DashboardComponent } from './ArchiveManagement/Pages/dashboard/dashboard.component';
import { HeaderComponent } from './ArchiveManagement/Componants/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileComponent} from "./ArchiveManagement/Componants/profile/profile.component";
import {
  ArchivesConfigurationComponent
} from "./ArchiveManagement/Pages/archives-configuration/archives-configuration.component";
import {
  AdministrativeComptableComponent
} from "./ArchiveManagement/Pages/administrative-comptable/administrative-comptable.component";
import {
  ControleConformiterComponent
} from "./ArchiveManagement/Pages/controle-conformiter/controle-conformiter.component";
import {ChangePasswordComponent} from "./ArchiveManagement/Componants/change-password/change-password.component";
import {DocPaginationComponent} from "./ArchiveManagement/Componants/Paging/doc-pagination/doc-pagination.component";
import {EmpruntDocumentComponent} from "./ArchiveManagement/Pages/emprunt-document/emprunt-document.component";
import {
  StructPaginationComponent
} from "./ArchiveManagement/Componants/Paging/struct-pagination/struct-pagination.component";
import {ChartDataComponent} from "./ArchiveManagement/Pages/chart-data/chart-data.component";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {BatimentComponent} from "./ArchiveManagement/Componants/batiment/batiment.component";
import {NiveauBatiment} from "./models/NiveauBatiment";
import {ChambreComponent} from "./ArchiveManagement/Componants/chambre/chambre.component";
import {NiveauComponent} from "./ArchiveManagement/Componants/niveau/niveau.component";
import {EtagereComponent} from "./ArchiveManagement/Componants/etagere/etagere.component";
import {RayonComponent} from "./ArchiveManagement/Componants/rayon/rayon.component";
import {
  BatimentPaginationComponent
} from "./ArchiveManagement/Componants/Paging/batiment-pagination/batiment-pagination.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    ArchivesConfigurationComponent,
    AdministrativeComptableComponent,
    ControleConformiterComponent,
    ChangePasswordComponent,
    DocPaginationComponent,
    EmpruntDocumentComponent,
    StructPaginationComponent,
    ChartDataComponent,
    BatimentComponent,
    ChambreComponent,
    NiveauComponent,
    EtagereComponent,
    RayonComponent,
    BatimentPaginationComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule


  ],
  providers: [AuthenticationGuard ,AuthenticationService, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

