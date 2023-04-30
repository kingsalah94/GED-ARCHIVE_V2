import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Batiment} from "../../model/Batiment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BatimentService} from "../../services/Batiment/batiment.service";
import {NiveauBatiment} from "../../model/NiveauBatiment";
import {NiveauBatimentService} from "../../services/NiveauBatiment/niveau-batiment.service";

@Component({
  selector: 'app-page-niveau-bat',
  templateUrl: './page-niveau-bat.component.html',
  styleUrls: ['./page-niveau-bat.component.css']
})
export class PageNiveauBatComponent {

  niveau?: NiveauBatiment[];
  currentNiveau: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private niveauService: NiveauBatimentService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveNiveau(): void {
    this.niveauService.getAllNiveauxBatiment().subscribe({
      next: (data) => {
        this.niveau = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveNiveau();
    this.currentNiveau = {};
    this.currentIndex = -1;
  }

  setActiveNiveau(niveau: NiveauBatiment, index: number): void {
    this.currentNiveau = niveau;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentNiveau = {};
    this.currentIndex = -1;

    this.niveauService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.niveau = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
