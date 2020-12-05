import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlProviderService} from '../url-provider/url-provider.service';
import {ILead} from '../models/lead.model';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LeadService
{
	constructor(private urlProvider: UrlProviderService,
	            private readonly http: HttpClient)
	{
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public getManyLeadsByCategory(categoryId: string)
	{
		const url = this.urlProvider.getApiEndpoint('lead', 'byCategory', categoryId);
		return this.http.get(url);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public getOneLead(leadId: string)
	{
		const url = this.urlProvider.getApiEndpoint('lead', leadId);
		return this.http.get(url);
	}

	/**
	 * Get many leads by job and by availability
	 * @param jobId
	 */
	public getManyLeadsByJobByAvailabilities(jobId: string): Observable<ILead[]>
	{
		const url = this.urlProvider.getApiEndpoint('lead', 'available', 'ByJob', jobId);
		return this.http.get<ILead[]>(url);
	}

	/**
	 * @description Type: POST
	 * @description Endpoint: ...
	 * @description ...
	 */
	public createOneObjectLeadByFileByCategory(categoryId: string, file: FormData)
	{
		const url = this.urlProvider.getApiEndpoint('lead', 'byCategory', categoryId);
		return this.http.post(url, file);
	}

	/**
	 * @description Type: POST
	 * @description Endpoint: ...
	 * @description ...
	 */
	public updateOneLead(model: ILead)
	{
		const url = this.urlProvider.getApiEndpoint('lead');
		return this.http.put(url, model);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public deleteOneLead(leadId: string)
	{
		const url = this.urlProvider.getApiEndpoint('lead', leadId);
		return this.http.delete(url);
	}
}
