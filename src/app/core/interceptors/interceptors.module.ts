import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorInterceptor} from './error.interceptor';
import {JwtInterceptor} from './jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {AuthenticationDataService} from '../authentication/authentication-data.service';
import { CacheInterceptor } from './cache.interceptor';
import { CacheService } from '../cache/cache.service';
import {StorageMap} from '@ngx-pwa/local-storage';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class InterceptorsModule
{
    static forRoot(): ModuleWithProviders<InterceptorsModule>
    {
        return {
            ngModule: InterceptorsModule,
            providers: [
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
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CacheInterceptor,
                    multi: true,
                    deps: [
                        CacheService,
                    ]
                }
            ]
        }
    }
}
