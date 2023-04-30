import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NiveauBatiment} from "../../model/NiveauBatiment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NiveauBatimentService} from "../../services/NiveauBatiment/niveau-batiment.service";
import {Etagere} from "../../model/Etagere";
import {EtagereService} from "../../services/Etagere/etagere.service";

@Component({
  selector: 'app-page-etagere',
  templateUrl: './page-etagere.component.html',
  styleUrls: ['./page-etagere.component.css']
})
export class PageEtagereComponent {

  etagere?: Etagere[];
  currentEtagere: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private etagereService: EtagereService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveNiveau(): void {
    this.etagereService.getAllEtagere().subscribe({
      next: (data) => {
        this.etagere = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveNiveau();
    this.currentEtagere = {};
    this.currentIndex = -1;
  }

  setActiveEtagere(etagere: Etagere, index: number): void {
    this.currentEtagere = etagere;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentEtagere = {};
    this.currentIndex = -1;

    this.etagereService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.etagere = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
