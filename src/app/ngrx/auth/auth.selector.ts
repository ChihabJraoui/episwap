import {IAppState} from '../index';
import {createSelector} from '@ngrx/store';

const authState = (state: IAppState) => state.auth;

export const selectAuthLoading = createSelector(authState, state => state.loading);
export const selectAuthError = createSelector(authState, state => state.error);

/*
 *  Login
 */

export const selectLoginError = createSelector(authState, state => (state.error));
export const selectLoginLoading = createSelector(authState, state => (state.loading));
export const selectLoginFormState = createSelector(authState, (state) => ({loading: state.loading, error: state.error, registerError: state.error}));

export const selectIsAuthenticated = createSelector(authState, state => ((state.isAuthenticated)));

export const selectAuthUser = createSelector(authState, state => state.user);
