import { TestBed, inject } from '@angular/core/testing';

import { CipherService } from './cipher.service';

describe('CipherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CipherService]
    });
  });

  it('should be created', inject([CipherService], (service: CipherService) => {
    expect(service).toBeTruthy();
  }));
});
