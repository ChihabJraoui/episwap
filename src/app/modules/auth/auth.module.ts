import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../core/design/material.module';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {MaterialElevationAuthDirective} from '../../shared/directives/elevation/material-elevation-auth.directive';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
	declarations: [
		LoginComponent,
		MaterialElevationAuthDirective,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,

		SharedModule,
		MaterialModule,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AuthModule
{
}
