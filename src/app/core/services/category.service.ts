import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlProviderService} from '../url-provider/url-provider.service';
import {ICategory} from '../models/category.model';

@Injectable({
	providedIn: 'root'
})
export class CategoryService
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
	getManyCategoryByAgency(agencyId: string)
	{
		const url = this.urlProvider.getApiEndpoint('category', 'byAgency', agencyId);

		// Append cache query string
		const queryString = this.urlProvider.convertToQueryStrings({cache: 60});

		return this.http.get(this.urlProvider.join(url, queryString));
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	getOneCategory(categoryId: string): Observable<any>
	{
		const url = this.urlProvider.getApiEndpoint('category', categoryId);
		return this.http.get(url);
	}

	/**
	 * @description Type: POST
	 * @description Endpoint: ...
	 * @description ...
	 */
	createOneCategory(model: ICategory)
	{
		const url = this.urlProvider.getApiEndpoint('category');
		return this.http.post(url, model);
	}

	/**
	 * @description Type: POST
	 * @description Endpoint: ...
	 * @description ...
	 */
	updateOneCategory(model: ICategory)
	{
		const url = this.urlProvider.getApiEndpoint('category');
		return this.http.put(url, model);
	}

	/**
	 * @description Type: GET
	 * @description Endpoint: ...
	 * @description ...
	 */
	deleteOneCategory(categoryId: string): Observable<any>
	{
		const url = this.urlProvider.getApiEndpoint('category', categoryId);
		return this.http.delete(url);
	}
}
