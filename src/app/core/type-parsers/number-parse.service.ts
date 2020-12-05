import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class NumberParseService
{
	private _numberDecimalSeparator;

	constructor()
	{
		this._numberDecimalSeparator = 2;
	}

	public formatToDisplayNumber(value)
	{
		/* Round digits after point to two digits */
		value = +(Math.round(parseFloat(value + "e+2"))  + "e-2");

		return (value + '').replace('.', this._numberDecimalSeparator);
	}

	public formatToDisplayNumberWithUnit(value, unit)
	{
		let formattedNumber = this.formatToDisplayNumber(value);

		return [formattedNumber, unit].join(' ');
	}

	public convertToServerNumber(input)
	{
		let value = input;

		if (value && value !== null && value.replace !== undefined)
		{
			value = value.replace(',', '.');
		}

		return value;
	}

	public floorLimitDecimals(input, decimals)
	{
		let factor = Math.pow(10, decimals),
			val = input;

		if (!val)
		{
			return input;
		}

		try
		{
			if (typeof(val) == 'string')
			{
				if (val === '-')
				{
					return input;
				}
				if (val.charAt(val.length - 1) === '.')
				{
					return input;
				}
				val = parseFloat(val);
			}

			return parseInt(String(factor * val)) / factor;
		}
		catch (e)
		{
			return input;
		}
	}
}
