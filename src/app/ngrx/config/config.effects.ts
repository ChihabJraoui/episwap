import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {map, switchMap, tap} from 'rxjs/internal/operators';
import {IAppState} from '../index';
import {Observable} from 'rxjs';
import * as ConfigActions from './config.actions';
import {HttpClient} from '@angular/common/http';
import {UrlProviderService} from '../../core/url-provider/url-provider.service';
import {selectIsAuthenticated} from '../auth/auth.selector';
import {AuthorizationService} from '../../core/authorization/authorization.service';
import {AuthenticationDataService} from '../../core/authentication/authentication-data.service';

@Injectable()
export class ConfigEffects
{
    /**
     * Send Ping request to the server
     * @type {Observable<ObservedValueOf<Observable<object & TypedAction<string>>>>}
     */
    @Effect()
    loadSystemSettings$: Observable<Action> = this.actions$.pipe(
        ofType(ConfigActions.startAppInitializer),
        switchMap(() =>
        {
            const url = this.urlProvider.getApiEndpoint('Application', 'Ping');
            return this.http.get(url).pipe(
                map(() => ConfigActions.loadSystemSettingsSuccess({ settings: true }))
            );
        })
    );

    constructor(private store: Store<IAppState>,
                private actions$: Actions,
                private urlProvider: UrlProviderService,
                // private navigationService: NavigationService,
                private authorizationService: AuthorizationService,
                private authDataService: AuthenticationDataService,
                private http: HttpClient)
    {
    }
}
