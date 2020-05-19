import { TestBed } from '@angular/core/testing';

import { ParkAccessService } from './park-access.service';

describe('ParkAccessService', () => {
  let service: ParkAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
