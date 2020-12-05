import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, switchMap} from 'rxjs/operators';
import {CacheService} from '../cache/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor
{
	constructor(private cacheService: CacheService)
	{
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		let cache$: Observable<any> = of(null);

		// Check if the request is set to be cached
		const isCachable = this.cacheService.isCachable(request.urlWithParams);

		if (isCachable)
		{
			cache$ = this.cacheService.getCacheItems(request.urlWithParams);
			const newUrl = this.cacheService.getUrlWithoutCacheParam(request.urlWithParams);

			request = request.clone({
				url: newUrl,
			});
		}

		// Clear the cache if needed
		if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(request.method) >= 0)
		{
			this.cacheService.isItemsCached(request.urlWithParams).subscribe(isCached =>
			{
				if (isCached)
				{
					this.cacheService.clear(request.urlWithParams);
				}
			});
		}

		const httpEvent = next.handle(request).pipe(
			tap((response: HttpResponse<any>) =>
			{
				if (isCachable && response.body !== undefined)
				{
					const cachedItems = Array.isArray(response.body) ? response.body : Object.values(response.body)[0];
					this.cacheService.addCacheItems(response.url, cachedItems);
				}
			})
		);

		return cache$.pipe(
			switchMap(cache =>
			{
				return cache === null ? httpEvent : of(cache);
			})
		);
	}
}
