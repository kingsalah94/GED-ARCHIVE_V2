import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablePaginationComponent } from './responsable-pagination.component';

describe('ResponsablePaginationComponent', () => {
  let component: ResponsablePaginationComponent;
  let fixture: ComponentFixture<ResponsablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
