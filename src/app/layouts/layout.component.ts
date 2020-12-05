import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, takeUntil} from 'rxjs/operators';
import {NavigationService} from '../core/utils/navigation/navigation.service';
import {AuthenticationDataService} from '../core/authentication/authentication-data.service';
import {AuthFacade} from '../core/facades/authentication.facade';
import {ConfigFacade} from '../core/facades/config.facade';

interface FsDocument extends HTMLDocument
{
	webkitFullscreenElement: Element;
	webkitExitFullscreen: any;
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	msExitFullscreen?: () => void;
	mozCancelFullScreen?: () => void;
}

interface FsDocumentElement extends HTMLElement
{
	webkitRequestFullscreen: any;
	msRequestFullscreen?: () => void;
	mozRequestFullScreen?: () => void;
}

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit
{
	isHandset$: Observable<boolean>;
	payloadUser: any;
	ohterTheme = false;
	view$: Observable<string>;

	constructor(public navigationService: NavigationService,
	            private readonly authDataService: AuthenticationDataService,
	            private readonly breakpointObserver: BreakpointObserver,
	            private readonly authFacade: AuthFacade,
	            private readonly configFacade: ConfigFacade)
	{
		this.payloadUser = authDataService.user;

		this.view$ = configFacade.getView();
	}

	ngOnInit()
	{
		const breakpoints = [
			Breakpoints.Small,
			Breakpoints.XSmall,
		];

		this.isHandset$ = this.breakpointObserver.observe(breakpoints).pipe(
			map(result => result.matches)
		);
	}

	logout()
	{
		this.authFacade.logout();
	}

	fullscreen()
	{
		console.log('fullscreen()');
		this.toggleFullScreen();
	}

	changeTheme()
	{
		console.log('changeTheme()');
		this.ohterTheme = !this.ohterTheme;
		console.log('otherTheme value : ', this.ohterTheme);
	}

	private isFullScreen(): boolean
	{
		const fsDoc = document as FsDocument;
		return !!(fsDoc.msFullscreenElement || fsDoc.mozFullScreenElement || fsDoc.webkitFullscreenElement || fsDoc.msFullscreenElement);
	}

	private toggleFullScreen(): void
	{
		const fsDoc = document as FsDocument;
		if (!this.isFullScreen())
		{
			const fsDocElem = document.documentElement as FsDocumentElement;
			if (fsDocElem.requestFullscreen)
			{
				fsDocElem.requestFullscreen();
			}
			else
			{
				if (fsDocElem.msRequestFullscreen)
				{
					fsDocElem.msRequestFullscreen();
				}
				else
				{
					if (fsDocElem.mozRequestFullScreen)
					{
						fsDocElem.mozRequestFullScreen();
					}
					else
					{
						if (fsDocElem.webkitRequestFullscreen)
						{
							fsDocElem.webkitRequestFullscreen();
						}
					}
				}
			}
		}
		else
		{
			if (fsDoc.exitFullscreen)
			{
				fsDoc.exitFullscreen();
			}
			else
			{
				if (fsDoc.msExitFullscreen)
				{
					fsDoc.msExitFullscreen();
				}
				else
				{
					if (fsDoc.mozCancelFullScreen)
					{
						fsDoc.mozCancelFullScreen();
					}
					else
					{
						if (fsDoc.webkitExitFullscreen)
						{
							fsDoc.webkitExitFullscreen();
						}
					}
				}
			}
		}
	}

	private setFullScreen(full: boolean): void
	{
		if (full !== this.isFullScreen())
		{
			this.toggleFullScreen();
		}
	}
}
