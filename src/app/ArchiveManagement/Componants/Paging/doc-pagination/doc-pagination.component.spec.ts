import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPaginationComponent } from './doc-pagination.component';

describe('DocPaginationComponent', () => {
  let component: DocPaginationComponent;
  let fixture: ComponentFixture<DocPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
