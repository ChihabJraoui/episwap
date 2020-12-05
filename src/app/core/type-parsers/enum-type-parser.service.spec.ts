import { TestBed } from '@angular/core/testing';

import { EnumTypeParserService } from './enum-type-parser.service';

describe('EnumTypeParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnumTypeParserService = TestBed.get(EnumTypeParserService);
    expect(service).toBeTruthy();
  });
});
