import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationDataService} from '../authentication/authentication-data.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate
{
    constructor(private router: Router,
                private authDataService: AuthenticationDataService)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>
    {
    	// if(this.authDataService.user.role === ROLE_CLIENT)
	    // {
	    // 	this.router.navigate(['/client']);
	    // }

    	return false;
    }
}
