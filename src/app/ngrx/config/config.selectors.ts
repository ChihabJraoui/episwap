import {IAppState} from '../index';
import {createSelector} from '@ngrx/store';
import {IConfigState} from './config.reducer';

const configState = (state: IAppState) => state.config;

export const selectIsConfigReady = createSelector(configState, (state: IConfigState) => state.isReady);

export const selectPermissions = createSelector(configState, (state: IConfigState) => state.permissions);

export const selectCurrentView = createSelector(configState, (state: IConfigState) => state.view);

export const selectMenu = createSelector(configState, (state: IConfigState) => state.menu);
