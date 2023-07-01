import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitePaginationComponent } from './boite-pagination.component';

describe('BoitePaginationComponent', () => {
  let component: BoitePaginationComponent;
  let fixture: ComponentFixture<BoitePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoitePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoitePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
