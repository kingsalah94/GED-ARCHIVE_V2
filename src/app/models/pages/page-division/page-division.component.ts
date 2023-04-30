import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DivisionService} from "../../services/Division/division.service";
import {Divisions} from "../../model/Divisions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-division',
  templateUrl: './page-division.component.html',
  styleUrls: ['./page-division.component.css']
})
export class PageDivisionComponent {
  division?: Divisions[];
  currentdivision: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private divisionService: DivisionService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveDivision(): void {
    this.divisionService.getAllDivision().subscribe({
      next: (data) => {
        this.division = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveDivision();
    this.currentdivision = {};
    this.currentIndex = -1;
  }

  setActivedivision(division: Divisions, index: number): void {
    this.currentdivision = division;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentdivision = {};
    this.currentIndex = -1;

    this.divisionService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.division = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
