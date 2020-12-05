import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationService} from './navigation/navigation.service';
import {AuthenticationService} from './authentication/authentication.service';
import {AuthenticationDataService} from './authentication/authentication-data.service';
import {AuthorizationService} from './authorization/authorization.service';
import {AuthorizationDirective} from './authorization/authorization.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {Router} from '@angular/router';
import {JwtInterceptor} from './interceptors/jwt.interceptor';

@NgModule({
	declarations: [
		AuthorizationDirective
	],
	exports: [
		AuthorizationDirective
	],
	imports: [
		CommonModule,
		HttpClientModule,
	]
})
// @ts-ignore
export class CoreModule
{
	// @ts-ignore
	constructor(@Optional() @SkipSelf() parentModule: CoreModule)
	{
		if (parentModule)
		{
			throw new Error('CoreModule is already loaded. Import it in the AppModule only');
		}
	}

	static forRoot(): ModuleWithProviders<CoreModule>
	{
		return {
			ngModule: CoreModule,
			providers: [
				// Authentication
				AuthenticationService,
				AuthenticationDataService,

				// Authorization
				AuthorizationService,

				// Navigation
				NavigationService,

				{
					provide: HTTP_INTERCEPTORS,
					useClass: ErrorInterceptor,
					multi: true,
					deps: [
						AuthenticationDataService,
						AuthenticationService,
						Router
					]
				},
				{
					provide: HTTP_INTERCEPTORS,
					useClass: JwtInterceptor,
					multi: true,
					deps: [
						AuthenticationDataService
					]
				},
				// {
				//     provide: HTTP_INTERCEPTORS,
				//     useClass: CacheInterceptor,
				//     multi: true,
				//     deps: [
				//         CacheService
				//     ]
				// }
			]
		}
	}
}
