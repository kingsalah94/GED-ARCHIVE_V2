import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageParametreGeneraleComponent } from './page-parametre-generale.component';

describe('PageParametreGeneraleComponent', () => {
  let component: PageParametreGeneraleComponent;
  let fixture: ComponentFixture<PageParametreGeneraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageParametreGeneraleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageParametreGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
