import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {AuthenticationDataService} from '../authentication/authentication-data.service';
import {filter, switchMap, take} from 'rxjs/internal/operators';
import {IUser} from '../models/user.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    private _pendingRefresh;
    private _refreshTokenSubject: BehaviorSubject<any>;

    constructor(private authDataService: AuthenticationDataService,
                private authService: AuthenticationService,
                private router: Router)
    {
        this._pendingRefresh = false;
        this._refreshTokenSubject = new BehaviorSubject<any>(null);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(request).pipe(catchError(err =>
        {
            if (err.status === 401)
            {
                if(!this._pendingRefresh)
                {
                    this._pendingRefresh = true;
                    this._refreshTokenSubject.next(null);

                    let token = this.authDataService.token;
                    let refreshToken = this.authDataService.refreshToken;

                    // Send refresh token request: /api/token
                    return this.authService.refreshToken(token, refreshToken).pipe(
                        switchMap((data: IUser) =>
                        {
                            console.log('Refresh token: ', data);

                            this._pendingRefresh = false;

                            this._refreshTokenSubject.next(data.refreshToken);

                            this.authDataService.setAuthData({
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken,
                            }, true);

                            return next.handle(this.addToken(request, data.refreshToken));
                        }),
	                    catchError(error =>
	                    {
	                    	console.log(error);

		                    this._pendingRefresh = false;
		                    this._refreshTokenSubject.next(null);

	                    	// TODO: Logout or lock screen!!!!
	                    	this.authService.logout().subscribe(() =>
		                    {
		                        this.router.navigate(['/auth/login']);
		                    });

                            return throwError(error);
	                    })
                    );
                }
                else
                {
                    return this._refreshTokenSubject.pipe(
                        filter(result => result !== null),
                        take(1),
                        switchMap(token =>
                        {
                            return next.handle(this.addToken(request, token));
                        })
                    );
                }
            }

            // if(err.status === 0)
            // {
            //     this.router.navigate(['/error/no-server-error'])
            // }

            // TODO: StatusText is always equal 'OK', and sometimes error object contains validation messages.
            // OK is the default statusText when there no error msg from the server
            // if (err.statusText === 'OK' && err.error!== undefined && err.error!== null)
            //     return throwError(err.error.message || err.error.error || 'Server Error');

            const error = err.error.message || err.error.error || err.error || 'Server Error';
            return throwError(error);
        }));
    }

    private addToken(request: HttpRequest<any>, token: string)
    {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
