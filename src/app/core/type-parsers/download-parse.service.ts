import {Injectable} from '@angular/core';
import {FieldTypeFactoryService} from './field-type-factory.service';

@Injectable({
	providedIn: 'root'
})

export class DownloadParseService
{
	private _enumTypeName;

	constructor(private fieldTypeFactory: FieldTypeFactoryService)
	{
		this._enumTypeName = 'Enum';
	}

	isValidDownloadFieldTypeValue(value)
	{
		return !!(value !== undefined && value !== null && value.split(';').length === 2);
	}


	public parse(downloadFieldTypeValue)
	{
		let downloadFieldTypeValueObj;

		if (this.isValidDownloadFieldTypeValue(downloadFieldTypeValue) !== true)
		{
			return {
				id: null,
				fileExtention: null
			};
		}

		downloadFieldTypeValueObj = downloadFieldTypeValue.split(';');

		return {
			id: downloadFieldTypeValueObj[0],
			fileExtention: downloadFieldTypeValueObj[1]
		};
	}
}
