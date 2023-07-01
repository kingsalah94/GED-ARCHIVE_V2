import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionPaginationComponent } from './direction-pagination.component';

describe('DirectionPaginationComponent', () => {
  let component: DirectionPaginationComponent;
  let fixture: ComponentFixture<DirectionPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
