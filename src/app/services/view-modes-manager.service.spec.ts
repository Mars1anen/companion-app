import { TestBed, inject } from '@angular/core/testing';

import { ViewModesManagerService } from './view-modes-manager.service';

describe('ViewModesManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewModesManagerService]
    });
  });

  it('should be created', inject([ViewModesManagerService], (service: ViewModesManagerService) => {
    expect(service).toBeTruthy();
  }));
});
