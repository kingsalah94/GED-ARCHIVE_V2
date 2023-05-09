import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../GlobaleServices/user.service";
import {User} from "../../../models/user";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {ChangePasswordRequest} from "../../../models/ChangePasswordRequest";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  user!: User;
  currentUser!: User;
  showLoading: boolean = false;
  request!:ChangePasswordRequest;

  constructor(private userService: UserService,private authenticateService:AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticateService.getUserFromLocalCache();
    if (this.user.firstLogin) {
      this.onChangePassword();
    }
  }

  onChangePassword(): void {
    this.showLoading = true;
    const newPassword: string = ""; // Remplacez par le mot de passe saisi par l'utilisateur
    this.userService.changePassword(this.request).subscribe({
      next: (response: CustomHttpResponse) => {
        // Gérer la réponse de l'API
        this.showLoading = false;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs
        this.showLoading = false;
      }
    });
  }

}
