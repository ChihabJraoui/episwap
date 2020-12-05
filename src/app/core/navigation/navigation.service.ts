import {Injectable} from '@angular/core';
import {MENU_ITEMS, ANONYM_VIEWS} from './menu-items-config';
import {AuthorizationService} from '../authorization/authorization.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../../ngrx';
import {Router} from '@angular/router';
import {storeMenu} from '../../ngrx/config/config.actions';

@Injectable()
export class NavigationService
{
	constructor(private _store: Store<IAppState>,
	            private authorizationService: AuthorizationService,
	            private router: Router)
	{
	}

	/**
	 * Build the displayed menu and add it to the store
	 */
	buildSidebarMenu()
	{
		// const menu = MENU_ITEMS.map(item =>
		// {
		// 	if (item.label === null || item.hide)
		// 	{
		// 		return;
		// 	}
		//
		// 	if (!this.authorizationService.hasPermission(item.permissions))
		// 	{
		// 		return;
		// 	}
		// });

		this._store.dispatch(storeMenu({ menu: MENU_ITEMS }));
	}

	/**
	 * Get view permission
	 * @param route
	 */
	getViewPermission(route: string): string[]
	{
		let viewMenu = MENU_ITEMS.filter(item => route.startsWith(item.route));

		return viewMenu.length > 0 ? viewMenu[0].permissions : [];
	}

	/**
	 * Returns the first view that the user is allowed to visit
	 * note: you can change the ordering of views on: MenuItemsConfig.MENU_ITEMS
	 */
	getDefaultView(): string
	{
		let default_view = null;

		MENU_ITEMS.some(menu_item =>
		{
			if (this.authorizationService.hasPermission(menu_item.permissions))
			{
				default_view = menu_item.route;
				return true;
			}

			return false;
		});

		if (default_view === null)
		{
			return ANONYM_VIEWS.LOGIN_VIEW_ROUTE;
		}

		return default_view;
	}

	/**
	 * Navigate to a view if the user has the permisnsio
	 * otherwise it avigate to the default view
	 */
	isAllowed(route: string): boolean
	{
		let viewPermission = this.getViewPermission(route);
		return this.authorizationService.hasPermission(viewPermission);
	}

	/**
	 *
	 */
	navigateToDefault(): void
	{
		const default_view = this.getDefaultView();
		this.router.navigate(['/' + default_view]);
	}
}
