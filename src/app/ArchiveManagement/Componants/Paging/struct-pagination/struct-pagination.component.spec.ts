import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructPaginationComponent } from './struct-pagination.component';

describe('StructPaginationComponent', () => {
  let component: StructPaginationComponent;
  let fixture: ComponentFixture<StructPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
