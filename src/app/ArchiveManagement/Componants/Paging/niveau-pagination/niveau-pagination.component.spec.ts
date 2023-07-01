import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauPaginationComponent } from './niveau-pagination.component';

describe('NiveauPaginationComponent', () => {
  let component: NiveauPaginationComponent;
  let fixture: ComponentFixture<NiveauPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
