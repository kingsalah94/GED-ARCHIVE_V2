import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {DossierService} from "../../services/dossier/dossier.service";
import {Dossier} from "../../model/dossier";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Batiment} from "../../model/Batiment";
import {Router} from "@angular/router";
import {BatimentService} from "../../services/Batiment/batiment.service";

@Component({
  selector: 'app-page-dossier',
  templateUrl: './page-dossier.component.html',
  styleUrls: ['./page-dossier.component.css']
})
export class PageDossierComponent implements OnInit {

  dossier?: Dossier[];
  currentDossier: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private dossierService: DossierService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveDossier(): void {
    this.dossierService.getAllDossier().subscribe({
      next: (data) => {
        this.dossier = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveDossier();
    this.currentDossier = {};
    this.currentIndex = -1;
  }

  setActiveDossier(dossier: Dossier, index: number): void {
    this.currentDossier = dossier;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentDossier = {};
    this.currentIndex = -1;

    this.dossierService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.dossier = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
