import { Action, createReducer, on } from '@ngrx/store';
import * as _actions from '../actions/account.actions';

export interface IAccountState {
    company: any;
    account: any;
    loading: boolean;
    errorCompany?:any
    errorAccount?:any
}

export const initAccountState: IAccountState = {
    company: {},
    account: {},
    loading: false,
    errorCompany: null,
    errorAccount: null
};

const reducer = createReducer(initAccountState,

    /* Init Error */
    on(_actions.initErrorAccount, state =>
    {
        return {
            ...state,
            error: null
        };
    }),

        /* Get account */

        on(_actions.getAccount, state => {
            return {
                ...state,
                loading: true
            };
        }),

    /* Get account successful */

    on(_actions.getAccountSuccess, (state, { model }) => {

        return {
            ...state,
            loading: false,
            errorAccount: null,
            account: model,
        }
    }),

    /* Get account failure */

    on(_actions.getAccountFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            errorAccount: error
        }
    }),

    /* Get company */

    on(_actions.getCompany, state => {
        return {
            ...state,
            loading: true
        };
    }),

    /* Get company successful */

    on(_actions.getCompanySuccess, (state, { model }) => {

        return {
            ...state,
            loading: false,
            errorCompany: null,
            company: model,
        }
    }),

    /* Get company failure */

    on(_actions.getCompanyFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            errorCompany: error
        }
    }),

    /* Update company */

    on(_actions.updateCompany, state => {
        return {
            ...state,
            loading: true
        };
    }),

    /* Update company successful */

    on(_actions.updateCompanySuccess, (state,{model}) => {

        return {
            ...state,
            loading: false,
            errorCompany: null,
            company:model
        }
    }),

    /* Update company failure */

    on(_actions.updateCompanyFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            errorCompany: error
        }
    }),
);

export function AccountReducer(state: IAccountState | undefined, action: Action) {
    return reducer(state, action);
}
