import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtagereComponent } from './etagere.component';

describe('EtagereComponent', () => {
  let component: EtagereComponent;
  let fixture: ComponentFixture<EtagereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtagereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtagereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
