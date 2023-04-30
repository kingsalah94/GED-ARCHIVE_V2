import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleConformiterComponent } from './controle-conformiter.component';

describe('ControleConformiterComponent', () => {
  let component: ControleConformiterComponent;
  let fixture: ComponentFixture<ControleConformiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleConformiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleConformiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
