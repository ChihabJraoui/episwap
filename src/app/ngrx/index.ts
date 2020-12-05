import {ActionReducerMap} from '@ngrx/store';
import {authReducer, IAuthState} from './auth/auth.reducer';
import {IAccountState, AccountReducer} from './reducers/account.reducers';
import {ChangePasswordReducer, IChangePasswordState} from './reducers/change-password.reducers';
import {configReducer, IConfigState} from './config/config.reducer';

export interface IAppState
{
    readonly config: IConfigState,
    readonly auth: IAuthState,

    readonly account: IAccountState,
    readonly changePassword: IChangePasswordState,
}

export const appReducers: ActionReducerMap<IAppState> = {
    config: configReducer,
    auth: authReducer,

	account: AccountReducer,
    changePassword: ChangePasswordReducer,
};
