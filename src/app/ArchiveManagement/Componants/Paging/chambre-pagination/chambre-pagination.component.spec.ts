import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambrePaginationComponent } from './chambre-pagination.component';

describe('ChambrePaginationComponent', () => {
  let component: ChambrePaginationComponent;
  let fixture: ComponentFixture<ChambrePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambrePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambrePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
