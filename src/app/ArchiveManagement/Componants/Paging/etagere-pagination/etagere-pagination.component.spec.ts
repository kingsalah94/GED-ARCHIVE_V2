import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtagerePaginationComponent } from './etagere-pagination.component';

describe('EtagerePaginationComponent', () => {
  let component: EtagerePaginationComponent;
  let fixture: ComponentFixture<EtagerePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtagerePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtagerePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
