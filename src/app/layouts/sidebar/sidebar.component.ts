import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigFacade} from '../../core/facades/config.facade';
import {MENU_ITEMS} from '../../core/navigation/menu-items-config';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit
{
	@Input() compact: boolean;

	menu$: Observable<any>;

    constructor(private readonly configFacade: ConfigFacade)
    {
    	this.menu$ = configFacade.getMenu();
    }

    ngOnInit()
    {
    	this.compact = this.compact || false;
    }

    get navigationMenuItems()
    {
    	return MENU_ITEMS;
    }
}
