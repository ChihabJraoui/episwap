import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlProviderService} from '../url-provider/url-provider.service';
import {IJob} from '../models/job.model';
import {ILead} from '../models/lead.model';
import {ISales} from '../models/sales.model';

@Injectable({
	providedIn: 'root'
})
export class JobService
{
	constructor(private readonly urlProvider: UrlProviderService,
	            private readonly http: HttpClient)
	{
	}

	/**
	 *
	 * @param agencyId
	 * @param typeJob
	 */
	public getJobByAgencyByType(agencyId: string, typeJob: number)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'byAgency', agencyId, 'byTypeJob', typeJob);
		return this.http.get(url);
	}

	/**
	 *
	 * @param agencyId
	 */
	public getJobsByAgency(agencyId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'byAgency', agencyId);
		return this.http.get(url);
	}

	/**
	 *
	 * @param agencyId
	 */
	public getJobsCountByAgency(agencyId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'count', 'byAgency', agencyId);
		return this.http.get(url);
	}

	/**
	 *
	 * @param model
	 * @param leads
	 * @param sales
	 */
	public createOneJob(model: IJob, leads: ILead[], sales: ISales[])
	{
		const url = this.urlProvider.getApiEndpoint('job');
		return this.http.post(url, model);
	}

	/**
	 *
	 * @param model
	 */
	public updateOneJob(model: IJob): Observable<any>
	{
		const url = this.urlProvider.getApiEndpoint('job');
		return this.http.put(url, model);
	}

	/**
	 *
	 * @param jobId
	 */
	public deleteOneJob(jobId: string): Observable<any>
	{
		const url = this.urlProvider.getApiEndpoint('job', jobId);
		return this.http.delete(url);
	}

	/**
	 *
	 * @param jobId
	 * @param salesId
	 */
	public createESalesWithJob(jobId: string, salesId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'jobId', jobId, 'salesId', salesId);
		return this.http.get(url);
	}

	/**
	 *
	 * @param jobId
	 * @param leadId
	 */
	public createELeadWithJob(jobId: string, leadId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'jobId', jobId, 'leadId', leadId);
		return this.http.get(url);
	}

	/**
	 * Delete Relation one Job to one Sales
	 *
	 * @param jobId
	 * @param salesId
	 */
	public deleteESalesWithJob(jobId: string, salesId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'jobId', jobId, 'salesId', salesId);
		return this.http.delete(url);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	public deleteELeadWithJob(jobId: string, leadId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'jobId', jobId, 'leadId', leadId);
		return this.http.delete(url);
	}

	/**
	 * Delete all relations Job to Sales
	 *
	 * @param jobId
	 */
	public deleteAllRelationSalesWithJob(jobId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'jobId', jobId, 'sales');
		return this.http.delete(url);
	}

	/**
	 * Delete all relations Lead to Job
	 *
	 * @param jobId
	 */
	public deleteAllRelationLeadWithJob(jobId: string)
	{
		const url = this.urlProvider.getApiEndpoint('job', 'jobId', jobId, 'lead');
		return this.http.delete(url);
	}
}

