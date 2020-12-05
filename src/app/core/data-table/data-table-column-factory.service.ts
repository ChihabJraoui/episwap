import {Injectable} from '@angular/core';

export interface IDataTableColumn
{
	header: string;
	field: string;
	sortable: boolean;
}

@Injectable()
export class DataTableColumnFactory
{

	constructor()
	{
	}

	make(header: string, field: string, sortable?: boolean): IDataTableColumn
	{
		return {
			header: header,
			field: field,
			sortable: sortable
		}
	}
}
