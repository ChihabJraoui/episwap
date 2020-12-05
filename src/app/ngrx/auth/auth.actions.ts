import {createAction, props} from '@ngrx/store';
import {IUser} from '../../core/models/user.model';

export const loginFromLocalStorage = createAction('[Auth] Login From Storgae', props<{ user: IUser }>());

export const login = createAction('[Auth] Login', props<{ user: IUser }>());
export const loginSuccess = createAction('[Auth] Login Successfull', props<{ user: IUser }>());
export const loginFailed = createAction('[Auth] Login Failed', props<{ error: any }>());

export const logout = createAction('[Auth] logout');
