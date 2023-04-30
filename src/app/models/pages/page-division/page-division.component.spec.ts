import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDivisionComponent } from './page-division.component';

describe('PageDivisionComponent', () => {
  let component: PageDivisionComponent;
  let fixture: ComponentFixture<PageDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
