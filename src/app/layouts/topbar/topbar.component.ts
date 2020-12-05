import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IAppState} from 'src/app/ngrx';
import {logout} from 'src/app/ngrx/auth/auth.actions';
import {Observable} from 'rxjs';
import {IUser} from '../../core/models/user.model';
import {selectAuthUser} from '../../ngrx/auth/auth.selector';
import {AuthenticationDataService} from '../../core/authentication/authentication-data.service';
import {UrlProviderService} from '../../core/url-provider/url-provider.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit
{
    languages: Array<{
        id: number,
        flag?: string,
        name: string
    }>;

    selectedLanguage: {
        id: number,
        flag?: string,
        name: string
    };

    openMobileMenu: boolean;

    searchQuery;

    user$: Observable<IUser>;

    @Output() settingsButtonClicked = new EventEmitter();
    @Output() mobileMenuButtonClicked = new EventEmitter();

    constructor(private store: Store<IAppState>,
        private urlProvider: UrlProviderService,
        private authDataService: AuthenticationDataService,
        private router: Router)
    {
        this.user$ = store.select(selectAuthUser);
    }

    ngOnInit()
    {
        this.openMobileMenu = false;
    }

    get profilePicture()
    {
        return 'assets/images/avatar_sm.jpg';
    }

    /**
     * Change the language
     * @param language language
     */
    changeLanguage(language)
    {
        this.selectedLanguage = language;
    }

    /**
     * Toggles the right sidebar
     */
    toggleRightSidebar()
    {
        this.settingsButtonClicked.emit();
    }

    /**
     * Toggle the menu bar when having mobile screen
     */
    toggleMobileMenu(event: any)
    {
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

    /**
     * Search
     */
    search()
    {
        this.router.navigate(['/search'], {
            queryParams: {
                query: this.searchQuery
            }
        });
    }

    /**
     * Logout the user
     */
    logout()
    {
        this.store.dispatch(logout());
    }
}
