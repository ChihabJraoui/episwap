import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {take, switchMapTo} from 'rxjs/operators';
import {IAppState} from 'src/app/ngrx';
import {Store} from '@ngrx/store';
import {selectIsAuthenticated} from 'src/app/ngrx/auth/auth.selector';

@Injectable({
	providedIn: 'root'
})
export class CacheService implements OnDestroy
{
	private _cacheDbVersion = 1;
	private _cacheDbName = 'RocketSalesCacheDB';
	private _cacheDb: IDBDatabase;
	private cacheClear$: Subscription;

	constructor(private _store: Store<IAppState>)
	{
		if (!('indexedDB' in self))
		{
			console.error('The browser doesn\'t support IndexedDB.');
		}

		this.cacheClear$ = _store.select(selectIsAuthenticated).subscribe(isAuthenticated =>
		{
			// Clear All Cache When User Logout
			if (isAuthenticated === false)
			{
				this.init().subscribe(() =>
				{
					try
					{
						const transaction = this._cacheDb.transaction('cachedItems', 'readwrite');
						const store = transaction.objectStore('cachedItems');
						store.clear();
					}
					catch (error)
					{
						console.log('Cache error: ', error);
					}
				});
			}
		});

	}

	ngOnDestroy(): void
	{
		this.cacheClear$.unsubscribe();
	}

	/**
	 * Initialze the indexedDB cache :
	 *  - create the database initiale structure
	 *  - open the database
	 */
	private init(): Observable<any>
	{
		return new Observable(observer =>
		{
			try
			{
				if (this._cacheDb === undefined)
				{
					let cacheRequest = window.indexedDB.open(this._cacheDbName, this._cacheDbVersion);

					cacheRequest.onupgradeneeded = (event) =>
					{
						this._cacheDb = cacheRequest.result;
						const objectStore = this._cacheDb.createObjectStore('cachedItems', {keyPath: 'key'});
						observer.next(true);
					};

					cacheRequest.onsuccess = (event) =>
					{
						this._cacheDb = cacheRequest.result;
						observer.next(true);
					};

					cacheRequest.onerror = (event) =>
					{
						observer.next(true);
					};
				}
				else
				{
					observer.next(true);
				}
			}
			catch (error)
			{
				observer.next(true);
			}
		}).pipe(take(1));

	}

	/**
	 * Add Items to cache
	 */
	public addCacheItems(key: string, items: any): void
	{
		const encodedKey = btoa(key);

		try
		{
			const transaction = this._cacheDb.transaction('cachedItems', 'readwrite');
			const store = transaction.objectStore('cachedItems');

			store.put({
				key: encodedKey,
				tstamp: Date.now(),
				items
			});

			transaction.oncomplete = () =>
			{
				// this._cacheDB.close();
			};
		}
		catch (error)
		{
			console.log('Cache error: ', error);
		}
	}

	/**
	 * Get cached items from indexDB
	 */
	public getCacheItems(key: string): Observable<any>
	{
		const cacheItems$ = new Observable(observer =>
		{
			try
			{
				const urlParams = new URLSearchParams(key.split('?')[1]);

				if (!urlParams.has('cache'))
				{
					observer.next(null);
				}

				const duration = parseInt(urlParams.get('cache') || '0', 10);
				const encodedKey = btoa(this.getUrlWithoutCacheParam(key));

				const transaction = this._cacheDb.transaction('cachedItems', 'readwrite');
				const store = transaction.objectStore('cachedItems');
				const itemsQuery = store.get(encodedKey);

				itemsQuery.onsuccess = () =>
				{
					if (!!itemsQuery.result && (Date.now() - itemsQuery.result['tstamp']) / (1000 * 60) < duration)
					{
						const cacheResponse = new HttpResponse({
							status: 200,
							body: itemsQuery.result['items']
						});

						observer.next(cacheResponse);
					}
					else
					{
						observer.next(null);
					}
				};
			}
			catch (error)
			{
				observer.next(null);
			}
		}).pipe(take(1));

		return this.init().pipe(
			switchMapTo(cacheItems$)
		);
	}

	/**
	 * Check if key is cached
	 */
	isItemsCached(key: string): Observable<boolean>
	{
		key = this.getUrlWithoutIdParam(key);

		const isCached$ = new Observable<boolean>(observer =>
		{
			try
			{
				const encodedKey = btoa(key);

				const transaction = this._cacheDb.transaction('cachedItems', 'readwrite');
				const store = transaction.objectStore('cachedItems');
				const itemsQuery = store.get(encodedKey);

				itemsQuery.onsuccess = () =>
				{
					if (!!itemsQuery.result)
					{
						observer.next(true);
					}
					else
					{
						observer.next(false);
					}
				};
			}
			catch (error)
			{
				observer.next(false);
			}
		}).pipe(take(1));

		return this.init().pipe(
			switchMapTo(isCached$)
		);
	}

	public clear(key: string): void
	{
		key = this.getUrlWithoutIdParam(key);

		try
		{
			const encodedKey = btoa(key);

			const transaction = this._cacheDb.transaction('cachedItems', 'readwrite');
			const store = transaction.objectStore('cachedItems');

			store.delete(encodedKey);

			transaction.oncomplete = () =>
			{
				// this._cacheDB.close();
			};
		}
		catch (error)
		{
			console.log('Cache error: ', error);
		}
	}

	/**
	 * Check if url has ?cache={minute}
	 */
	public isCachable(url: string): boolean | number
	{
		if (!('URLSearchParams' in self))
		{
			return false;
		}

		const urlParams = new URLSearchParams(url.split('?')[1]);

		return urlParams.has('cache');
	}

	/**
	 * Return the url without ?cache={minute}
	 */
	public getUrlWithoutCacheParam(url: string): string
	{
		if (!('URLSearchParams' in self))
		{
			return url;
		}

		const urlParams = new URLSearchParams(url.split('?')[1]);

		if (urlParams.has('cache'))
		{
			urlParams.delete('cache');
			let urlParamsStr = unescape(urlParams.toString());
			return urlParamsStr === '' ? url.split('?')[0] : `${url.split('?')[0]}?${urlParams.toString()}`;
		}

		return url;
	}

	private getUrlWithoutIdParam(url: string)
	{
		const guuidRegx = RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
		let lastUrlParam = url.split('/').slice(-1)[0];

		return guuidRegx.test(lastUrlParam) ? url.replace(`/${lastUrlParam}`, "") : url;
	}
}
