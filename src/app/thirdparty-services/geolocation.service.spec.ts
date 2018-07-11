import { TestBed, inject } from '@angular/core/testing';

import { GeolocationService } from '../thirdparty-services/geolocation.service';

describe('IpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService]
    });
  });

  it('should be created', inject([GeolocationService], (service: GeolocationService) => {
    expect(service).toBeTruthy();
  }));
});
