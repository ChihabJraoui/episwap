import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {IAppState} from '../index';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/internal/operators';
import {loginFailed, loginSuccess} from './auth.actions';
import {Observable, of} from 'rxjs';
import {IUser} from '../../core/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {AuthenticationDataService} from '../../core/authentication/authentication-data.service';

@Injectable()
export class AuthEffects
{
    /**
     * Login effect
     * @type {Observable<ObservedValueOf<Observable<any>>>}
     */
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActions.login),
        map(action => action.user),
        switchMap((user: IUser) =>
        {
            return this.authService.login(user.email, user.password).pipe(
                map((response: IUser) =>
                {
                    // TODO: Think about set credentials before dispatching loadPermissions
                    this.authDataService.setAuthData(response);

                    /*
                     * Dispatching loginSuccess action will trigger the reducer, and while the reducer changes
                     * isAuthenticated to true, this will trigger also the loadPermissions Effect.
                     */
                    return loginSuccess({ user: response })
                }),
                catchError(error => of(loginFailed({ error: error })))
            );
        })
    );

    /**
     * Login Successful
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    loginSuccess$: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(action => action.user),
        tap((user) =>
        {
	        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	        this.router.navigate([returnUrl]);
        })
    );

    /**
     * Logout
     * @type {Observable<any> & CreateEffectMetadata}
     */
    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() =>
        {
            this.authService.logout().subscribe(() =>
            {
                this.router.navigate(['/auth/login']);
            });
        })
    );

    constructor(private actions$: Actions,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthenticationService,
                private authDataService: AuthenticationDataService)
    {
    }
}
