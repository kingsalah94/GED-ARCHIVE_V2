import { Component } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Structures } from '../../model/Structures';
import { StructureService } from '../../services/Structure/structure.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.css'],
})
export class PageStructureComponent {
  structure?: Structures[];
  currentStructur: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private structureService: StructureService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveStructurs(): void {
    this.structureService.getAllStructure().subscribe({
      next: (data) => {
        this.structure = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveStructurs();
    this.currentStructur = {};
    this.currentIndex = -1;
  }

  setActiveStructur(structur: Structures, index: number): void {
    this.currentStructur = structur;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentStructur = {};
    this.currentIndex = -1;

    this.structureService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.structure = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
