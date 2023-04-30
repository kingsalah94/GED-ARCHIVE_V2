import {Component, Input} from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppUser} from "../../model/AppUser";

@Component({
  selector: 'app-page-detail-utilisateur',
  templateUrl: './page-detail-utilisateur.component.html',
  styleUrls: ['./page-detail-utilisateur.component.css']
})
export class PageDetailUtilisateurComponent {




  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }









}
