import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateParseService} from './date-parse.service';


@NgModule({
	declarations: [],
	imports: [
		CommonModule
	]
})

export class TypeParserModule
{
	static forRoot(): ModuleWithProviders
	{
		return {
			ngModule: TypeParserModule,
			providers: [
				DateParseService
			]
		}
	}
}
