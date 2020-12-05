import {Injectable} from '@angular/core';
import {IAppState} from 'src/app/ngrx';
import {Store} from '@ngrx/store';
import {selectPermissions} from '../../ngrx/config/config.selectors';
import {HttpClient} from '@angular/common/http';
import {UrlProviderService} from '../url-provider/url-provider.service';
import {AuthenticationDataService} from '../authentication/authentication-data.service';

@Injectable()
export class AuthorizationService
{
    private readonly _permissions;

    constructor(private store: Store<IAppState>,
                private http: HttpClient,
                private authenticationData: AuthenticationDataService,
                private urlProvider: UrlProviderService)
    {
        this._permissions = [];
    }

    /**
     * Get permissions list from database
     * @returns {Observable<Object>}
     */
    getPermissions()
    {
        const url = this.urlProvider.getApiEndpoint('permissions');
        return this.http.get<string[]>(url);
    }

    /**
     * Check if a user has view permission
     * @param {string[]} permissions
     * @returns {boolean}
     */
    hasPermission(permissions: string[]): boolean
    {
        // /* Filter out Permissions to test if the authrization works properly*/
        //.filter(p => ( p !== "AdminAccess" && p !== "UserAccess"))
        return permissions.some(permission => this.containsAll(this._permissions, permission.split(' ')));
    }

    private containsAll(arr: Array<any>, subArr: Array<any>)
    {
        for (let i = 0; i < subArr.length; i++)
        {
            if (arr.indexOf(subArr[i]) === -1) return false;
        }

        return true;
    }
}
