import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesConfigurationComponent } from './archives-configuration.component';

describe('ArchivesConfigurationComponent', () => {
  let component: ArchivesConfigurationComponent;
  let fixture: ComponentFixture<ArchivesConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
