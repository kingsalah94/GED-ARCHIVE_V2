import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestControleConformiterComponent } from './gest-controle-conformiter.component';

describe('GestControleConformiterComponent', () => {
  let component: GestControleConformiterComponent;
  let fixture: ComponentFixture<GestControleConformiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestControleConformiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestControleConformiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
