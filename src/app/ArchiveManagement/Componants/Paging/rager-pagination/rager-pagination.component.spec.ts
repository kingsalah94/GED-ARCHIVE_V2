import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RagerPaginationComponent } from './rager-pagination.component';

describe('RagerPaginationComponent', () => {
  let component: RagerPaginationComponent;
  let fixture: ComponentFixture<RagerPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RagerPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RagerPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
