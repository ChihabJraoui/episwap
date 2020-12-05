import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../ngrx';
import {login, logout} from '../../ngrx/auth/auth.actions';
import {IUser} from '../models/user.model';
import {selectAuthError, selectAuthLoading} from '../../ngrx/auth/auth.selector';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthFacade
{
	constructor(private readonly store: Store<IAppState>)
	{
	}

	getLoading(): Observable<boolean>
	{
		return this.store.select(selectAuthLoading);
	}

	getError(): Observable<string>
	{
		return this.store.select(selectAuthError);
	}

	login(user: IUser)
	{
		this.store.dispatch(login({ user: user }));
	}

	logout()
	{
		this.store.dispatch(logout());
	}
}
