import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministraticeComptableComponent } from './administratice-comptable.component';

describe('AdministraticeComptableComponent', () => {
  let component: AdministraticeComptableComponent;
  let fixture: ComponentFixture<AdministraticeComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministraticeComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministraticeComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
