import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationDataService} from './authentication-data.service';
import {Observable, of} from 'rxjs';
import {UrlProviderService} from '../url-provider/url-provider.service';
import {IUser} from '../models/user.model';

@Injectable()

export class AuthenticationService
{
    constructor(private http: HttpClient,
                private urlProvider: UrlProviderService,
                private authenticationDataService: AuthenticationDataService)
    {
    }

	/**
	 * Login user
	 * @param username
	 * @param password
	 */
	login(username, password)
    {
        let apiEndpoint = this.urlProvider.getApiEndpoint('auth', 'login');

        let body = {
            'email': username,
            'password': password
        };

        return this.http.post(apiEndpoint, body);
    }


	/**
	 * Logout user
	 */
	logout()
    {
        return new Observable((observer) =>
        {
            // TODO: change state - loggedOut

            this.authenticationDataService.clear();

            return observer.next(true);
        });
    }

    changePassword(model)
    {
        const apiEndpoint = this.urlProvider.getApiEndpoint('changePassword');

        return this.http.put(apiEndpoint, model).toPromise().then((response) =>
        {
            return response;
        });
    }

    /**
     * Refresh Token
     * @param {string} token
     * @param {string} refreshToken
     * @returns {Observable<Object>}
     */
    refreshToken(token: string, refreshToken: string)
    {
        let apiEndpoint = this.urlProvider.getApiEndpoint('Authentication', 'RefreshToken');

        let body = {
            "token": token,
            "refreshToken": refreshToken
        };

        return this.http.post(apiEndpoint, body);
    }
}
