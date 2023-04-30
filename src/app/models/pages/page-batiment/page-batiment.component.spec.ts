import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBatimentComponent } from './page-batiment.component';

describe('PageBatimentComponent', () => {
  let component: PageBatimentComponent;
  let fixture: ComponentFixture<PageBatimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBatimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBatimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
