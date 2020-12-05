import { TestBed } from '@angular/core/testing';

import { DateParseService } from './date-parse.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalStorageModule} from 'angular-2-local-storage';
import {HttpClientModule} from '@angular/common/http';

describe('DateParseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports: [
		  RouterTestingModule,
		  HttpClientModule,
		  LocalStorageModule.forRoot({
			  storageType: 'localStorage'
		  }),
	  ],
  }));

  it('should be created', () => {
    const service: DateParseService = TestBed.get(DateParseService);
    expect(service).toBeTruthy();
  });
});
