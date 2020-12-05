import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopbarComponent} from './topbar/topbar.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../core/design/material.module';

@NgModule({
    declarations: [
        LayoutComponent,
        SidebarComponent,
        TopbarComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        SharedModule,
	    MaterialModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class LayoutsModule
{
}
