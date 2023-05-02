import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeComptableComponent } from './administrative-comptable.component';

describe('AdministraticeComptableComponent', () => {
  let component: AdministrativeComptableComponent;
  let fixture: ComponentFixture<AdministrativeComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativeComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
