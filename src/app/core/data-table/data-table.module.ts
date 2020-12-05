import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {MatIconModule, MatSortModule, MatTableModule} from '@angular/material';
import {DataTableColumnFactory} from './data-table-column-factory.service';

@NgModule({
	declarations: [
		DataTableComponent
	],
	exports: [
		DataTableComponent
	],
	imports: [
		CommonModule,

		MatIconModule,
		MatTableModule,
		MatSortModule
	],
	providers: [
		DataTableColumnFactory
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class DataTableModule
{
}
