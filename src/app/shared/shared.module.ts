import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbTimepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from './components/alert/alert.component';
import {MaterialElevationClientDirective} from './directives/elevation/material-elevation-client.directive';
import {MaterialModule} from '../core/design/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	entryComponents: [
		AlertComponent,
	],
	declarations: [
		AlertComponent,
		// ? Directives //
		MaterialElevationClientDirective,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		NgbCollapseModule,
		NgbDatepickerModule,
		NgbTimepickerModule,
		NgbDropdownModule,
		NgbTooltipModule,

		MatIconModule,
		MaterialModule,

		NgxSpinnerModule
	],
	exports: [
		AlertComponent,
		// ? Directives //
		MaterialElevationClientDirective,

		NgbCollapseModule,
		NgbDatepickerModule,
		NgbTimepickerModule,
		NgbDropdownModule,
		NgbTooltipModule,

		MaterialModule
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class SharedModule
{
}
