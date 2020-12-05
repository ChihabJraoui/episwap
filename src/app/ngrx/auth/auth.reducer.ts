import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {IUser} from '../../core/models/user.model';

export interface IAuthState
{
    loading: boolean;
    user: IUser,
    error: any;
    isAuthenticated: boolean;
    token: string;
}

const initAuthState: IAuthState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    token: null
};

const reducer = createReducer(
    initAuthState,

    on(AuthActions.login, state =>
    {
        return {
            ...state,
            loading: true
        };
    }),

    on(AuthActions.loginSuccess, (state, { user }) =>
    {
        return {
            ...state,
            loading: false,
            error: null,
            isAuthenticated: true,
            token: user.accessToken,
            user: user
        };
    }),

    on(AuthActions.loginFailed, (state, { error }) =>
    {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),

    /*
     *  Login from storage
     */
    on(AuthActions.loginFromLocalStorage, (state, {user}) => {
        return {
            ...state,
            user: user,
            isAuthenticated: true
        };
    }),

    /*
     *  Log Out
     */
    on(AuthActions.logout, state =>
    {
        return {
            ...state,
            isAuthenticated: false
        };
    }),
);

export function authReducer(state: IAuthState | undefined, action: Action)
{
    return reducer(state, action);
}
