import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UrlProviderService} from "../url-provider/url-provider.service";
import {map} from 'rxjs/operators';

// TODO: Add cache to this Service
export class CrudService<TModel>
{
    private _CACHE_EXPIRATION_DURATION = 30; // The unit is minute

    constructor(public endPointKey: string,
                private http: HttpClient,
                private urlProvider: UrlProviderService)
    {
    }

    // getAll(filterModel?: IFilterModel): Observable<{ entities: TModel[] }>
    // {
    //     const url = this.urlProvider.apiEndpoints[this.endPointKey];
	//
    //     return filterModel !== undefined && filterModel !== null ?
    //         this.http.post<{ entities: TModel[] }>(`${url}/GetFiltered`, filterModel) :
    //         this.http.get<{ entities: TModel[] }>(`${url}?cache=${this._CACHE_EXPIRATION_DURATION}`);
    // }

	/**
	 * Use filter to get data
	 * @param {IFilterModel} filterModel
	 * @returns {Observable<{entities: TModel[]}>}
	 */
	// filter(filterModel: IFilterModel): Observable<{ entities: TModel[] }>
    // {
    //     const url = this.urlProvider.apiEndpoints[this.endPointKey];
	//
    //     return this.http.post<{ entities: TModel[] }>(`${url}/GetFiltered`, filterModel);
    // }

	/**
	 * Get entity by ID
	 * @param {string} id
	 * @returns {Observable<TModel>}
	 */
	// get(id: string): Observable<TModel>
    // {
    //     const url = this.urlProvider.apiEndpoints[this.endPointKey];
	//
    //     return this.http.get<TModel>(`${url}/${id}`).pipe(
    //         map(res => res['statusCode'] !== undefined ? res['object'] : res )
    //     );
    // }

    // add(object: TModel & { id?: string }): Observable<TModel>
    // {
    //     const url = this.urlProvider.apiEndpoints[this.endPointKey];
	//
    //     const {id: value, ...objectWithoutId} = object;
    //     return this.http.post<TModel>(url, objectWithoutId);
    // }

    // update(object: TModel): Observable<TModel>
    // {
    //     if (object['id'] === undefined || object['id'] === null) throw Error('Update requires an Id');
	//
    //     const url = this.urlProvider.apiEndpoints[this.endPointKey];
	//
    //     return this.http.post<TModel>(url, object);
    // }

    // delete(id: string): Observable<string>
    // {
    //     const url = this.urlProvider.apiEndpoints[this.endPointKey];
	//
    //     return this.http.delete<string>(`${url}/${id}`);
    // }
}
