export interface IUser
{
    id?: string;
    clientId?: string;
    agencyId?: string;

    username?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;

    accessToken?: string;
    refreshToken?: string;

    role?: ERoles;

    creationTime?: number;
    updatedTime?: number;
}

export enum ERoles
{
	CLIENT = "client",
	MANAGER = "manager",
	SALES = "sales"
}
