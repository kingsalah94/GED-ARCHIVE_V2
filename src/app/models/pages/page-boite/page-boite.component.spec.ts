import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBoiteComponent } from './page-boite.component';

describe('PageBoiteComponent', () => {
  let component: PageBoiteComponent;
  let fixture: ComponentFixture<PageBoiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBoiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBoiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
