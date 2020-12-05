import {Injectable} from '@angular/core';
import {FieldTypeFactoryService} from './field-type-factory.service';

@Injectable({
	providedIn: 'root'
})
export class EnumService
{

	constructor(private fieldTypeFactory: FieldTypeFactoryService)
	{
	}

	camelize(str)
	{
		if (str === null)
		{
			return null;
		}

		return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
		{
			if (+match === 0)
			{
				return '';
			}

			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		});
	}


	/**
	 *  Prototype
	 */

	getEnumList(enumType)
	{
		let metaDataEndpoint = 'enum/' + enumType;

		return {};
		// return this.metaDataService.getMetaData([metaDataEndpoint]).then((metaData) =>
		// {
		// 	return metaData[metaDataEndpoint];
		// });
	}

	getTranslationKey(fieldType, value)
	{
		if(value === null)
		{
			return null;
		}

		let fieldTypeObj = this.fieldTypeFactory.create(fieldType);

		let translationKeyItems = [
			this.camelize(fieldTypeObj.mainType),
			this.camelize(fieldTypeObj.subType),
			value
		];

		return translationKeyItems.join('.');
	}
}
