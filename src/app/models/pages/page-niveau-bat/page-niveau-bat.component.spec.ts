import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNiveauBatComponent } from './page-niveau-bat.component';

describe('PageNiveauBatComponent', () => {
  let component: PageNiveauBatComponent;
  let fixture: ComponentFixture<PageNiveauBatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNiveauBatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNiveauBatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
