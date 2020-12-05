import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NavigationService
{
	constructor(private readonly router: Router)
	{
	}

	public goto(route: string, data?: any)
	{
		console.log('goto() => ', route);
		this.router.navigate([`/${route}`], data);
	}

	public logout(data?: any)
	{
		console.log('logout');
		this.router.navigate(['/home'], data);
	}
}
