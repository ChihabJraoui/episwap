import { TestBed } from '@angular/core/testing';

import { PlaceholderserviceService } from './placeholderservice.service';

describe('PlaceholderserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceholderserviceService = TestBed.get(PlaceholderserviceService);
    expect(service).toBeTruthy();
  });
});
