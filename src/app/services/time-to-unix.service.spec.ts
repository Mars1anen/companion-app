import { TestBed, inject } from '@angular/core/testing';

import { TimeToUnixService } from './time-to-unix.service';

describe('TimeToUnixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeToUnixService]
    });
  });

  it('should be created', inject([TimeToUnixService], (service: TimeToUnixService) => {
    expect(service).toBeTruthy();
  }));
});
