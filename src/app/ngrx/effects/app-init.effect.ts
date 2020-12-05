import {Injectable} from '@angular/core';
import {Actions, EffectNotification, ofType, OnRunEffects} from '@ngrx/effects';
import {exhaustMap, takeUntil} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import * as ConfigActions from '../config/config.actions';

@Injectable()
export class AppInitEffect implements OnRunEffects
{
    /**
     *
     * @param {Observable<EffectNotification>} resolvedEffects$
     * @returns {Observable<EffectNotification>}
     */
    ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification>
    {
        return this.actions$.pipe(
            ofType(ConfigActions.startAppInitializer),
            exhaustMap(() =>
            {
                console.log('App init effect executed');

                return resolvedEffects$.pipe(
                    takeUntil(this.actions$.pipe(ofType(ConfigActions.finishAppInitializer)))
                )
            })
        );
    }

    constructor(private actions$: Actions)
    {
    }
}
