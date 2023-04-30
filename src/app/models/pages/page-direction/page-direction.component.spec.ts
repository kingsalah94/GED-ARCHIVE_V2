import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDirectionComponent } from './page-direction.component';

describe('PageDirectionComponent', () => {
  let component: PageDirectionComponent;
  let fixture: ComponentFixture<PageDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
