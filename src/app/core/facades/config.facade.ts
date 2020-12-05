import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../ngrx';
import * as ConfigActions from '../../ngrx/config/config.actions';
import * as ConfigSelectors from '../../ngrx/config/config.selectors';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ConfigFacade
{
	constructor(private readonly store: Store<IAppState>)
	{
	}

	setView(view: string)
	{
		this.store.dispatch(ConfigActions.setView({ view: view }));
	}

	getView()
	{
		return this.store.select(ConfigSelectors.selectCurrentView);
	}

	getMenu(): Observable<any>
	{
		return this.store.select(ConfigSelectors.selectMenu);
	}
}
