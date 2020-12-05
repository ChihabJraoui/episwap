import { TestBed } from '@angular/core/testing';

import { FieldTypeFactoryService } from './field-type-factory.service';

describe('FieldTypeFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldTypeFactoryService = TestBed.get(FieldTypeFactoryService);
    expect(service).toBeTruthy();
  });
});
