import {Injectable} from '@angular/core';
import {FieldTypeFactoryService} from './field-type-factory.service';

@Injectable({
	providedIn: 'root'
})

export class EnumTypeParserService
{
	private _enumTypeName: any;

	constructor(private fieldTypeFactoryService: FieldTypeFactoryService)
	{
		this._enumTypeName = 'Enum';
	}

	parse(fieldType)
	{

		let fieldTypeObj = this.fieldTypeFactoryService.create(fieldType);

		if (fieldTypeObj.mainType === this._enumTypeName)
		{
			return fieldTypeObj.subType;
		}
		else
		{
			return null;
		}
	}
}
