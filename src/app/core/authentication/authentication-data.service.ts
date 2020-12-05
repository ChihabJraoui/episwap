import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {IUser} from '../models/user.model';
import * as _ from 'lodash';

declare var $;

@Injectable()
export class AuthenticationDataService
{
    private _user: IUser;

    constructor(private localStorageService: LocalStorageService)
    {
    }


    get userName()
    {
        return this._user.username;
    }

    get user(): IUser
    {
        return this._user;
    }

    set user(value)
    {
        this._user=value;
    }

    get token()
    {
        return this._user.accessToken;
    }

    get refreshToken()
    {
        return this._user.refreshToken;
    }

    get hasCredentials()
    {
        return !!(this._user && this._user.accessToken);
    }


    public loadData()
    {
        const authData: any = this.localStorageService.get('authData');

        if (authData !== null && Object.keys(authData).length !== 0)
        {
            this._user = authData.user;
        }
    }

    /**
     * Save Authentication Data in local storage.
     * @param {IUser} authData
     * @param {boolean} refreshToken
     */
    setAuthData(authData: IUser, refreshToken?: boolean)
    {
        let user: IUser;

        if (!authData)
        {
            throw Error('Cannot set AuthData, AuthData is empty');
        }

        if(refreshToken)
        {
            user = _.cloneDeep(this._user);

            user.accessToken = authData.accessToken;
            user.refreshToken = authData.refreshToken;
        }
        else
        {
            user = authData;
        }

        this._user = user;

        this.localStorageService.set('authData', {user: user,});

        /* TODO: SignalR configuration */
        /*$.signalR.ajaxDefaults.headers = {
          Authorization: 'Bearer ' + this._accessToken
        };*/
    }

    public clear()
    {
        this.localStorageService.remove('authData');
        this._user = null;
    }
}
