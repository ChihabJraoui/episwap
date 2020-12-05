import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationDataService} from '../authentication/authentication-data.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
	readonly LOGIN_VIEW_ROUTE;

    constructor(private router: Router,
                private authDataService: AuthenticationDataService)
    {
    	this.LOGIN_VIEW_ROUTE = '/auth/login';
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>
    {
        if (this.authDataService.hasCredentials)
        {
            if(this.isAnounymView(state.url))
            {
                // If the user is logged in and requests Anounym Views, redirect him to home.
                this.router.navigate(['/']);
                return false;
            }
            else
            {
                // If the user has credentials and visits a protected view
                // if(this.navigationService.isAllowed(state.url))
                // {
                    return true;
                // }

                // this.navigationService.navigateToDefault();
                // return false;
            }
        }
        else
        {
            if (!this.isAnounymView(state.url))
            {
                this.router.navigate([this.LOGIN_VIEW_ROUTE], {
                    queryParams: {returnUrl: state.url}
                });

                return false;
            }
            else
            {
                // If the user has no Credentials and visits an anounym view
                return true;
            }
        }
    }

    private isAnounymView(route: string): boolean
    {
        return Object.values([this.LOGIN_VIEW_ROUTE]).some(view => route.startsWith(view))
    }
}
