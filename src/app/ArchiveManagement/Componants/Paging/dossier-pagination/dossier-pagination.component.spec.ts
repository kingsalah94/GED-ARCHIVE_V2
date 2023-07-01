import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierPaginationComponent } from './dossier-pagination.component';

describe('DossierPaginationComponent', () => {
  let component: DossierPaginationComponent;
  let fixture: ComponentFixture<DossierPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
