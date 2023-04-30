import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Directions} from "../../model/Directions";
import {DirectionService} from "../../services/Direction/direction.service";
import {Structures} from "../../model/Structures";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-direction',
  templateUrl: './page-direction.component.html',
  styleUrls: ['./page-direction.component.css']
})
export class PageDirectionComponent {
  direction?: Directions[];
  currentdirection: {} = {};
  currentIndex = -1;
  errorMessage!: string;
  keyword = '';
  searchformGroup: FormGroup | undefined;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private directionService: DirectionService
  ) {}

  ngOnInit(): void {
    this.searchNom();
  }

  retrieveDirection(): void {
    this.directionService.getAllDirection().subscribe({
      next: (data) => {
        this.direction = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveDirection();
    this.currentdirection = {};
    this.currentIndex = -1;
  }

  setActivedirection(direction: Directions, index: number): void {
    this.currentdirection = direction;
    this.currentIndex = index;
  }

  searchNom(): void {
    this.currentdirection = {};
    this.currentIndex = -1;

    this.directionService.findByNom(this.keyword).subscribe({
      next: (data) => {
        this.direction = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
