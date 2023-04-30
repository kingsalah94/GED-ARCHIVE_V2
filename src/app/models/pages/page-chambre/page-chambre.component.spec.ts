import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChambreComponent } from './page-chambre.component';

describe('PageChambreComponent', () => {
  let component: PageChambreComponent;
  let fixture: ComponentFixture<PageChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
