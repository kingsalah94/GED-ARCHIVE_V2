import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Batiment} from "../../model/Batiment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BatimentService} from "../../services/Batiment/batiment.service";
import {Chambre} from "../../model/Chambre";
import {ChambreService} from "../../services/Chambre/chambre.service";

@Component({
  selector: 'app-page-chambre',
  templateUrl: './page-chambre.component.html',
  styleUrls: ['./page-chambre.component.css']
})
export class PageChambreComponent {

  chambre?: Chambre[];
  currentCahmbre: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private chambreService: ChambreService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveChambre(): void {
    this.chambreService.getAllChambre().subscribe({
      next: (data) => {
        this.chambre = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveChambre();
    this.currentCahmbre = {};
    this.currentIndex = -1;
  }

  setActiveChambre(chambre: Chambre, index: number): void {
    this.currentCahmbre = chambre;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentCahmbre = {};
    this.currentIndex = -1;

    this.chambreService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.chambre = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
