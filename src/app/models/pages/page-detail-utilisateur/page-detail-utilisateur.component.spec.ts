import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailUtilisateurComponent } from './page-detail-utilisateur.component';

describe('PageDetailUtilisateurComponent', () => {
  let component: PageDetailUtilisateurComponent;
  let fixture: ComponentFixture<PageDetailUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDetailUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDetailUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
