import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntPaginationComponent } from './emprunt-pagination.component';

describe('EmpruntPaginationComponent', () => {
  let component: EmpruntPaginationComponent;
  let fixture: ComponentFixture<EmpruntPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
