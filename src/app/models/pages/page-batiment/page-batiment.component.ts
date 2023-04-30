import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Structures} from "../../model/Structures";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {StructureService} from "../../services/Structure/structure.service";
import {Batiment} from "../../model/Batiment";
import {BatimentService} from "../../services/Batiment/batiment.service";

@Component({
  selector: 'app-page-batiment',
  templateUrl: './page-batiment.component.html',
  styleUrls: ['./page-batiment.component.css']
})
export class PageBatimentComponent implements OnInit {
  batiment?: Batiment[];
  currentBatiment: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private batimentService: BatimentService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveBatiment(): void {
    this.batimentService.getAllBatiment().subscribe({
      next: (data) => {
        this.batiment = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveBatiment();
    this.currentBatiment = {};
    this.currentIndex = -1;
  }

  setActiveBatiment(batiment: Batiment, index: number): void {
    this.currentBatiment = batiment;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentBatiment = {};
    this.currentIndex = -1;

    this.batimentService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.batiment = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
