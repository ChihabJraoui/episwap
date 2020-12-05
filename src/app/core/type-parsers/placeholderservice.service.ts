import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PlaceholderserviceService
{
	_suffix: any;

	constructor()
	{
		this._suffix = '%';
	}

	_isEmptyString(value)
	{
		return (value === undefined || value === null || value.length < 1);
	}

	_isValidString(value)
	{
		return (value !== undefined && value !== null && value.length > 1);
	}

	_startsWith(value)
	{
		return value.indexOf(this._suffix, 0) !== -1;
	}

	_endsWith(value)
	{
		return value.indexOf(this._suffix, value.length - this._suffix.length) !== -1;
	}

	isPlaceholder(value, allowEmptyValue)
	{
		if (this._isEmptyString(value) === true && allowEmptyValue === true)
		{
			return true;
		}

		return (this._isValidString(value) === true && this._startsWith(value) === true && this._endsWith(value) === true);
	}
}
