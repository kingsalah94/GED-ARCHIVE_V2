import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEtagereComponent } from './page-etagere.component';

describe('PageEtagereComponent', () => {
  let component: PageEtagereComponent;
  let fixture: ComponentFixture<PageEtagereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEtagereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEtagereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
