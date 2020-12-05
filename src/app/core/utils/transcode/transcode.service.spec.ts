import { TestBed } from '@angular/core/testing';

import { TranscodeService } from './transcode.service';

describe('TranscodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranscodeService = TestBed.get(TranscodeService);
    expect(service).toBeTruthy();
  });
});
