import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationDataService} from '../authentication/authentication-data.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
    constructor(private authDataService: AuthenticationDataService)
    {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        request = request.clone({
            setHeaders: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': 'Thu, 01 Jan 1970 00:00:00 GMT',
                'If-Modified-Since': '0'
            }
        });

        if (this.authDataService.hasCredentials)
        {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authDataService.token}`
                }
            });
        }

        return next.handle(request);
    }
}
