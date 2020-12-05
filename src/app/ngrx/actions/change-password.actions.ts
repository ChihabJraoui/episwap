import {createAction, props} from '@ngrx/store';

export const changePassword = createAction('[Settings Account] Change Password', props<{ model: any }>());
export const changePasswordSuccess = createAction('[Settings Account] Change Password Success', props<{ model: any }>());
export const changePasswordFailure = createAction('[Settings Account] Change Password Failure', props<{ error: string }>());

export const initErrorChangePassword = createAction('[Settings Account] Init Error Change Password');
