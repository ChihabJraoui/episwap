import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class FieldTypeFactoryService
{

	constructor()
	{
	}

	public create(fieldTypeAsString)
	{
		let fieldTypeSegments,
			fieldTypeObj = {
				mainType: null,
				subType: null
			};

		if (fieldTypeAsString !== undefined && fieldTypeAsString !== null)
		{
			fieldTypeSegments = fieldTypeAsString.split('_');

			if (fieldTypeSegments.length > 1)
			{
				fieldTypeObj.mainType = fieldTypeSegments[0];
				fieldTypeObj.subType = fieldTypeSegments[1];
			}
			else
			{
				fieldTypeObj.mainType = fieldTypeAsString;
			}
		}

		return fieldTypeObj;
	}
}
