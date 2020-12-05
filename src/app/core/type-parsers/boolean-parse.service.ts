import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class BooleanParseService
{

	constructor()
	{
	}

	parse(value, defaultValue?)
	{
		if (value === undefined || value === null)
		{
			return defaultValue;
		}
		else
		{
			return !!(value === true || value === 'true' || value === 'True');
		}
	}
}
