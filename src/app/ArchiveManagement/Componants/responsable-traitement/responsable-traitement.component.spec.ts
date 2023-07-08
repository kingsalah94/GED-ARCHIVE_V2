import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableTraitementComponent } from './responsable-traitement.component';

describe('ResponsableTraitementComponent', () => {
  let component: ResponsableTraitementComponent;
  let fixture: ComponentFixture<ResponsableTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableTraitementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
