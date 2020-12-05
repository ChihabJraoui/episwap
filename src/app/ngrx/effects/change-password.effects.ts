import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as _actions from '../actions/change-password.actions';
import {catchError, map, pluck, switchMap, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {IAppState} from '../index';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {Observable, of} from 'rxjs';

@Injectable()
export class changePasswordEffects
{
	// @Effect()
    // changePassword$: Observable<Action> = this.actions$.pipe(
    //     ofType(_actions.changePassword),
    //     pluck('model'),
    //     switchMap((model) =>
    //     {
    //         return this._changePasswordS.changePassword(model).pipe(map((model: any) =>
    //         {
    //             return _actions.changePasswordSuccess({model});
    //         }),
    //         catchError(error => of(_actions.changePasswordFailure({error: (error.message ? error.message : ((typeof error === 'string') ? error : 'Unknown Error'))}))))
    //     })
    // );

    @Effect()
    changePasswordSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(_actions.changePasswordSuccess),
                pluck('model'),
                tap((model) =>
                {
	                Swal.fire({
		                title: 'Success!',
		                html: '<p>Your password has been changed successfully!</p>',
		                icon: 'success',
	                });
                })
            ),
        {
            dispatch: false
        }
    );


    constructor(private store: Store<IAppState>,
                private actions$: Actions,
                private _router: Router)
    {

    }
}
