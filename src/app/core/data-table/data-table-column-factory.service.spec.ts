import { TestBed } from '@angular/core/testing';

import { DataTableColumnFactory } from './data-table-column-factory.service';

describe('DataTableColumnFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTableColumnFactory = TestBed.get(DataTableColumnFactory);
    expect(service).toBeTruthy();
  });
});
