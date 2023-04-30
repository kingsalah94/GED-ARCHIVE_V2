import {Component, OnInit, ViewChild} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Users} from "../../model/users.model";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UsersService} from "../../services/users/users.service";
import {Router} from "@angular/router";
import {Role} from "../../model/Role";
import {Divisions} from "../../model/Divisions";
import {HttpClient} from "@angular/common/http";
import {DivisionService} from "../../services/Division/division.service";


@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.css']
})
export class PageUtilisateurComponent implements OnInit {



  users?: Users[];
  currentUser: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveUser(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveUser();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(users: Users, index: number): void {
    this.currentUser = users;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.usersService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
