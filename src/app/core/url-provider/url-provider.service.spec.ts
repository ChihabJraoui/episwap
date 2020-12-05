import {TestBed} from '@angular/core/testing';

import {UrlProviderService} from './url-provider.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UrlProviderService', () =>
{
	beforeEach(() => TestBed.configureTestingModule({
		providers: [],
		imports: [
			HttpClientTestingModule
		]
	}));

	it('should be created', () =>
	{
		const service: UrlProviderService = TestBed.get(UrlProviderService);
		expect(service).toBeTruthy();
	});
});
