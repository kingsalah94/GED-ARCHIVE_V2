import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConfiguationsComponent } from './page-configuations.component';

describe('PageConfiguationsComponent', () => {
  let component: PageConfiguationsComponent;
  let fixture: ComponentFixture<PageConfiguationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConfiguationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageConfiguationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
