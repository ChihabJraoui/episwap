import {TestBed} from '@angular/core/testing';
import {AuthenticationDataService} from './authentication-data.service';
import {LocalStorageModule} from 'angular-2-local-storage';
import {AuthenticationService} from './authentication.service';

describe('AuthenticationDataService', () =>
{
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			LocalStorageModule.forRoot({
				storageType: 'localStorage'
			}),
		],
		providers: [
			AuthenticationService
		]
	}));

	it('should be created', () =>
	{
		// const service: AuthenticationDataService = TestBed.inject(AuthenticationDataService);
		// expect(service).toBeTruthy();
	});
});
