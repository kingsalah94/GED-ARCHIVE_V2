import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Boite} from "../../model/Boite";
import {BoiteService} from "../../services/Boite/boite.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-boite',
  templateUrl: './page-boite.component.html',
  styleUrls: ['./page-boite.component.css']
})
export class PageBoiteComponent {
  boite?: Boite[];
  currentBoite: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private boiteService: BoiteService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveBoite(): void {
    this.boiteService.getAllBoite().subscribe({
      next: (data) => {
        this.boite = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveBoite();
    this.currentBoite = {};
    this.currentIndex = -1;
  }

  setActiveBoite(boite: Boite, index: number): void {
    this.currentBoite = boite;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentBoite = {};
    this.currentIndex = -1;

    this.boiteService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.boite = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
