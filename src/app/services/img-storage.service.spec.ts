import { TestBed, inject } from '@angular/core/testing';

import { ImgStorageService } from './img-storage.service';

describe('ImgStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgStorageService]
    });
  });

  it('should be created', inject([ImgStorageService], (service: ImgStorageService) => {
    expect(service).toBeTruthy();
  }));
});
