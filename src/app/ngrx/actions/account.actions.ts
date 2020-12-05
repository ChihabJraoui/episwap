import {createAction, props} from '@ngrx/store';

export const getAccount = createAction('[Account] Get Account');
export const getAccountSuccess = createAction('[Account] Get Account Success', props<{ model: any }>());
export const getAccountFailure = createAction('[Account] Get Account Failure', props<{ error: string }>());

export const getCompany = createAction('[Account] Get Company');
export const getCompanySuccess = createAction('[Account] Get Company Success', props<{ model: any }>());
export const getCompanyFailure = createAction('[Account] Get Company Failure', props<{ error: string }>());

export const updateCompany = createAction('[Account] Update Company', props<{ model: any }>());
export const updateCompanySuccess = createAction('[Account] Update Company Success', props<{ model: any }>());
export const updateCompanyFailure = createAction('[Account] Update Company Failure', props<{ error: string }>());

export const initErrorAccount = createAction('[Account] Init Error');

