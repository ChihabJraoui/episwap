export interface ISales
{
	id?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	role?: number;
	latSales?: number;
	lngSales?: number;
	phoneSales?: string;
	appIsBlocked?: boolean;
	assignedBy?: string;
	creationTime?: number;
	updatedTime?: number;

	clientId?: string;
	agencyId?: string;
}
