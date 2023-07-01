import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPaginationComponent } from './division-pagination.component';

describe('DivisionPaginationComponent', () => {
  let component: DivisionPaginationComponent;
  let fixture: ComponentFixture<DivisionPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
