import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RayonService} from "../../services/Rayon/rayon.service";
import {NiveauBatiment} from "../../model/NiveauBatiment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NiveauBatimentService} from "../../services/NiveauBatiment/niveau-batiment.service";
import {Rayon} from "../../model/Rayon";

@Component({
  selector: 'app-page-rayon',
  templateUrl: './page-rayon.component.html',
  styleUrls: ['./page-rayon.component.css']
})
export class PageRayonComponent {
  rayon?: Rayon[];
  currentRayon: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private rayonservice: RayonService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveRayon(): void {
    this.rayonservice.getAllRayon().subscribe({
      next: (data) => {
        this.rayon = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveRayon();
    this.currentRayon = {};
    this.currentIndex = -1;
  }

  setActiveRayon(rayon: Rayon, index: number): void {
    this.currentRayon = rayon;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentRayon = {};
    this.currentIndex = -1;

    this.rayonservice.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.rayon = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
