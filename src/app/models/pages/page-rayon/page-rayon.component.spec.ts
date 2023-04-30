import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRayonComponent } from './page-rayon.component';

describe('PageRayonComponent', () => {
  let component: PageRayonComponent;
  let fixture: ComponentFixture<PageRayonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRayonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
