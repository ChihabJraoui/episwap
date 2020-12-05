import {Action, createReducer, on} from '@ngrx/store';
import * as ConfigActions from './config.actions';

/**
 * Config state interface
 */
export interface IConfigState
{
    isReady: boolean;

    // Set current view
    view: string;

    settings: any;
    permissions: string[];

    menu: any;
}

/**
 * Config state init values
 *
 * @type {{permisions: any[]}}
 */
export const initConfigState: IConfigState = {
    isReady: false,
	view: '',
    settings: false,
    permissions: [],
	menu: null
};

/**
 * Reducer
 */
const _reducer = createReducer(
	initConfigState,

    on(ConfigActions.loadSystemSettingsSuccess, (state, {settings}) =>
    {
        return {
            ...state,
            settings: settings,
            isReady: settings === true
        }
    }),

	on(ConfigActions.setView, (state, {view}) =>
	{
		return {
			...state,
			view: view
		}
	}),

	on(ConfigActions.storeMenu, (state, {menu}) =>
	{
		return {
			...state,
			menu: menu
		}
	})
);

export function configReducer(state: IConfigState, action: Action)
{
    return _reducer(state, action);
}
