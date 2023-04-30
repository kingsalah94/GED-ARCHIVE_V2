import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {BackendStorageService} from "../../../_services/backend-storage.service";
import {BackendAuthService} from "../../../_services/backend-auth.service";

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.css']
})
export class ChangerMotDePasseComponent {
   currentUser: any;

  constructor(private route:Router,private storageService: BackendStorageService,private auth:BackendAuthService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

}
