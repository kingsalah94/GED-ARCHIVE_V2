import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendStorageService} from "../../../_services/backend-storage.service";
import {BackendAuthService} from "../../../_services/backend-auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {

  currentUser: any;

  constructor(private route:Router,private storageService: BackendStorageService,private auth:BackendAuthService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  handleLogout() {
    this.auth.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();

      },
      error: err => {
        console.log(err);
      }
    });
    this.route.navigateByUrl("/login");
  }

  modiferMotDePasse() {
    this.route.navigate(['dashboard/changerMotdepasse']);
  }
}
