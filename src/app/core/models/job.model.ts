export interface IJob
{
	id?: string;
	name?: string;
	startJob?: number;
	endJob?: number;
	typeJob?: string;
	createdTime?: number;
	updatedTime?: number;

	assignedBy?: string;
	agencyId?: string;
	salesId?: string; // only for Booster Type
}

export enum JobTypes
{
	Mission = "1",
	HotLeads = "2",
	Booster = "3"
}
