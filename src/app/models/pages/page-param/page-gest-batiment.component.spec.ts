import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGestBatimentComponent } from './page-gest-batiment.component';

describe('PageGestBatimentComponent', () => {
  let component: PageGestBatimentComponent;
  let fixture: ComponentFixture<PageGestBatimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGestBatimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGestBatimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
