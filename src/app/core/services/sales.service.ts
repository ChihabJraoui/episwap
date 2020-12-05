import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlProviderService} from '../url-provider/url-provider.service';
import {ISales} from '../models/sales.model';

@Injectable({
	providedIn: 'root'
})
export class SalesService
{
	constructor(private readonly urlProvider: UrlProviderService,
	            private readonly http: HttpClient)
	{
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public getManySales()
	{
		const url = this.urlProvider.getApiEndpoint('sales');
		return this.http.get(url);
	}

	/**
	 * Get many ISales by agency ID
	 * @param agencyId
	 */
	getSalesByAgency(agencyId?: string)
	{
		const url = this.urlProvider.getApiEndpoint('sales', 'byAgency', agencyId);

		// Append cache query string
		const queryString = this.urlProvider.convertToQueryStrings({cache: 60});

		return this.http.get(this.urlProvider.join(url, queryString));
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public getManySalesByClient(clientId: string)
	{
		const url = this.urlProvider.getApiEndpoint('sales', 'byClient', clientId);
		return this.http.get(url);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public getSalesByJob(jobId: string)
	{
		const url = this.urlProvider.getApiEndpoint('sales', 'byJob', jobId);
		return this.http.get(url);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public getOneSales(salesId: string)
	{
		const url = this.urlProvider.getApiEndpoint('sales', salesId);
		return this.http.get(url);
	}

	/**
	 * @description Type: POST
	 * @description Endpoint: ...
	 * @description ...
	 */
	public createOneSales(model: ISales)
	{
		const url = this.urlProvider.getApiEndpoint('sales');
		return this.http.post(url, model);
	}

	/**
	 * @description Type: POST
	 * @description Endpoint: ...
	 * @description ...
	 */
	public updateOneSales(model: ISales)
	{
		const url = this.urlProvider.getApiEndpoint('sales');
		return this.http.put(url, model);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public deleteOneSales(clientId: string, agencyId: string, salesId: string)
	{
		const url = this.urlProvider.getApiEndpoint('sales', salesId, 'agency', agencyId, 'client', clientId);
		return this.http.delete(url);
	}
}
