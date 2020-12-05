import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {LocalStorageModule} from 'angular-2-local-storage';
import {HttpClientModule} from '@angular/common/http';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports:[
		  HttpClientModule,
		  LocalStorageModule.forRoot({
			  storageType: 'localStorage'
		  }),
	  ]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
