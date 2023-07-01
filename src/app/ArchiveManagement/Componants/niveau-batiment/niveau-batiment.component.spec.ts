import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauBatimentComponent } from './niveau-batiment.component';

describe('NiveauBatimentComponent', () => {
  let component: NiveauBatimentComponent;
  let fixture: ComponentFixture<NiveauBatimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauBatimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauBatimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
