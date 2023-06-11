import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentPaginationComponent } from './batiment-pagination.component';

describe('BatimentPaginationComponent', () => {
  let component: BatimentPaginationComponent;
  let fixture: ComponentFixture<BatimentPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatimentPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatimentPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
