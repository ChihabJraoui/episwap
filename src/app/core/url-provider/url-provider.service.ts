import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UrlProviderService
{
	private readonly _apiRootUrl: string;

	constructor()
	{
		// Load API url from environment variables
		this._apiRootUrl = environment.server.api.url;
	}

	/**
	 *
	 * @param args
	 * @returns {string}
	 */
	public getApiEndpoint(...args: any[])
	{
		// return this._apiRootUrl + '/api/' + Array.prototype.slice.call(args).join('/');
		return this._apiRootUrl + '/' + Array.prototype.slice.call(args).join('/');
	}

	/**
	 *  Convert object of key => value to a query string
	 *
	 * @param obj
	 * @returns {string}
	 */
	public convertToQueryStrings(obj)
	{
		return Object.keys(obj).map((key) =>
		{
			const value = obj[key];

			return encodeURIComponent(key) + '=' + encodeURIComponent(value);
		}).join('&');
	}

	/**
	 *  Join url with Query string.
	 *
	 * @param apiEndpoint
	 * @param queryString
	 * @returns {string}
	 */
	public join(apiEndpoint, queryString)
	{
		return [apiEndpoint, queryString].join('?');
	}
}
