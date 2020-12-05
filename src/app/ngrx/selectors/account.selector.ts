import {createSelector} from '@ngrx/store';
import {IAppState} from '../index';
import {IAccountState} from '../reducers/account.reducers';

const _selectAccount = (state: IAppState) => state.account;

export const selectModelCompany = createSelector(_selectAccount, (state: IAccountState) =>
{
    return state.company;
});

export const selectAccount = createSelector(
    _selectAccount,
    (state, props) => state !== undefined && state !== null ? state.account : null
);

// export const selectAccount = createSelector(_selectAccount, (state) => ({loading: state.loading, error: state.error}));

export const selectErrorCompany = createSelector(
    _selectAccount,
    (state: IAccountState) => state !== undefined && state !== null ? state.errorCompany : null
);
