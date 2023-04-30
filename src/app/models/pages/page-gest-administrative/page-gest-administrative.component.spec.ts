import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGestAdministrativeComponent } from './page-gest-administrative.component';

describe('PageGestAdministrativeComponent', () => {
  let component: PageGestAdministrativeComponent;
  let fixture: ComponentFixture<PageGestAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGestAdministrativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGestAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
