import {createAction, props} from '@ngrx/store';

export const startAppInitializer = createAction("[App] start app initializer");
export const finishAppInitializer = createAction("[App] finish app initializer");

/* VIEWS */
export const setView = createAction("[App] Set view", props<{ view: string }>());

export const loadSystemSettings = createAction("[App] load system settings");
export const loadSystemSettingsSuccess = createAction("[App] load system settings success", props<{ settings: any }>());

export const loadPermissions = createAction("[App] load permissions");
export const loadPermissionsSuccess = createAction("[App] load permissions success", props<{ permissions: string[] }>());
export const loadPermissionsFail = createAction("[App] load permissions Fail");

/* MENU */
export const storeMenu = createAction("[App] store menu items", props<{ menu: any }>());
