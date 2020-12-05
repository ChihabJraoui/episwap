import {createAction, props} from '@ngrx/store';

export const changeEmail = createAction('[Settings Account] Change Email', props<{ model: any }>());
export const changeEmailSuccess = createAction('[Settings Account] Change Email Success', props<{ model: any }>());
export const changeEmailFailure = createAction('[Settings Account] Change Email Failure', props<{ error: string }>());

export const initErrorChangeEmail = createAction('[Settings Account] Init Error Change Email');
