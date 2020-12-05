import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, InjectionToken, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ActionReducerMap, Store, StoreModule} from '@ngrx/store';
import {CoreModule} from './core/core.module';
import {LocalStorageModule} from 'angular-2-local-storage';
import {appReducers, IAppState} from './ngrx';
import {AuthenticationDataService} from './core/authentication/authentication-data.service';
import {loginFromLocalStorage} from './ngrx/auth/auth.actions';
import {finishAppInitializer, startAppInitializer} from './ngrx/config/config.actions';

/**
 * App Initialize
 * @param {Store<IAppState>} store
 * @param {AuthenticationDataService} authDataService
 * @returns {Function}
 */
export function initApplication(store: Store<IAppState>, authDataService: AuthenticationDataService): Function
{
	return () => new Promise((resolve) =>
	{
		authDataService.loadData();

		if (authDataService.hasCredentials)
		{
			store.dispatch(loginFromLocalStorage({ user: authDataService.user }));
		}

		store.dispatch(startAppInitializer());

		// store.select(selectIsConfigReady).subscribe((isReady) =>
		// {
		// 	console.log(isReady);
		//
		// 	if(isReady === true)
		// 	{
		store.dispatch(finishAppInitializer());
		resolve(true);
		// 	}
		// });
	});
}

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IAppState>>('RocketSaas Root Reducer');

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,

		CoreModule.forRoot(),

		StoreModule.forRoot({}, {}),

		LocalStorageModule.forRoot({
			storageType: 'sessionStorage',
			prefix: 'app'
		}),

		NgbModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initApplication,
			multi: true,
			deps: [
				Store,
				AuthenticationDataService
			]
		},
		{
			provide: REDUCER_TOKEN,
			useValue: appReducers
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule
{
}
