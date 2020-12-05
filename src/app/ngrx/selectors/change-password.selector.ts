import {createSelector} from '@ngrx/store';
import {IAppState} from '../index';

const _selectChangePassword = (state: IAppState) => state.changePassword;

export const selectChangePassword = createSelector(_selectChangePassword, (state) => ({loading: state.loading, error: state.error}));