import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonPaginationComponent } from './rayon-pagination.component';

describe('RayonPaginationComponent', () => {
  let component: RayonPaginationComponent;
  let fixture: ComponentFixture<RayonPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RayonPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RayonPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
