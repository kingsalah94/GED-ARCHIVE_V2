import { TestBed } from '@angular/core/testing';

import { RangerService } from './ranger.service';

describe('RangerService', () => {
  let service: RangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
