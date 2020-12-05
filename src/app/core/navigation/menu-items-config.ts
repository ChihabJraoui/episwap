export interface IMenuItem
{
    label: string,
    permissions: string[],
    route: string,
    hide: boolean,
    icon?: string,
    children?: IMenuItem[]
}


/*
 * Navigation menu items.
 */

// TODO: Super admin menu
export const ADMIN_MENU_ITEMS: IMenuItem[] = [];

export const MENU_ITEMS: IMenuItem[] = [
    {
        label: 'Vue d\'ensemble',
	    route: '/',
        hide: false,
        permissions: ['ViewOverview'],
        icon: 'fe-compass'
    },
    {
        label: 'Commerciaux',
	    route: '/sales',
        hide: false,
        permissions: ['ViewSales'],
        icon: 'fe-users'
    },
    {
        label: 'Centre d\'affaire',
	    route: '/business',
        hide: false,
        permissions: ['ViewBusiness'],
        icon: 'fe-briefcase'
    },
    {
        label: 'Tableau de suivi',
	    route: '/dashboard',
        hide: false,
        permissions: ['ViewDashboard'],
        icon: 'fe-airplay'
    },
];

export const ANONYM_VIEWS = {
    LOGIN_VIEW_ROUTE: '/auth/login',
};
