import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntDocumentComponent } from './emprunt-document.component';

describe('EmpruntDocumentComponent', () => {
  let component: EmpruntDocumentComponent;
  let fixture: ComponentFixture<EmpruntDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
