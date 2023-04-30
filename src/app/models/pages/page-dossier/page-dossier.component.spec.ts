import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDossierComponent } from './page-dossier.component';

describe('PageDossierComponent', () => {
  let component: PageDossierComponent;
  let fixture: ComponentFixture<PageDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
