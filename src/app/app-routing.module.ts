import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./ArchiveManagement/Componants/login/login.component";
import {RegisterComponent} from "./ArchiveManagement/Componants/register/register.component";
import {UserComponent} from "./ArchiveManagement/Componants/user/user.component";
import {DashboardComponent} from "./ArchiveManagement/Pages/dashboard/dashboard.component";
import {AuthenticationGuard} from "./Guards/authentication.guard";
import {AppComponent} from "./app.component";
import {ProfileComponent} from "./ArchiveManagement/Componants/profile/profile.component";
import {
  AdministrativeComptableComponent
} from "./ArchiveManagement/Pages/administrative-comptable/administrative-comptable.component";
import {
  ControleConformiterComponent
} from "./ArchiveManagement/Pages/controle-conformiter/controle-conformiter.component";
import {
  ArchivesConfigurationComponent
} from "./ArchiveManagement/Pages/archives-configuration/archives-configuration.component";
import {ChangePasswordComponent} from "./ArchiveManagement/Componants/change-password/change-password.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'user/management',
        component: UserComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'archives/administrativeComptable',
        component: AdministrativeComptableComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'archives/controleDeConformiter',
        component: ControleConformiterComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'archives/configurations',
        component: ArchivesConfigurationComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'user/change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthenticationGuard]
      },
    ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
