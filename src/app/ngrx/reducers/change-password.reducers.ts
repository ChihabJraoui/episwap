import { Action, createReducer, on } from '@ngrx/store';
import * as _actions from '../actions/change-password.actions';

export interface IChangePasswordState {
    model: any;
    loading: boolean;
    error?:any
}

export const initChangePasswordState: IChangePasswordState = {
    model: {},
    loading: false,
    error: null
};

const reducer = createReducer(initChangePasswordState,

    /* Init Error */
    on(_actions.initErrorChangePassword, state =>
    {
        return {
            ...state,
            error: null
        };
    }),

    /* Change password */

    on(_actions.changePassword, state => {
        return {
            ...state,
            loading: true
        };
    }),

    /* Change password successful */

    on(_actions.changePasswordSuccess, (state, { model }) => {

        return {
            ...state,
            loading: false,
            error: null,
            model: model,
        }
    }),

    /* Change password failure */

    on(_actions.changePasswordFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),
);

export function ChangePasswordReducer(state: IChangePasswordState | undefined, action: Action) {
    return reducer(state, action);
}
