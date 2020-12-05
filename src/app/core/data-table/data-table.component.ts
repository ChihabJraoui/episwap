import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit
{
	@Input() dataSource: any;
	@Input() columns: any;
	@Input() pageSize: number;
	@Input() pageOptions: number[];

	constructor()
	{
	}

	ngOnInit()
	{
		this.dataSource = this.dataSource || null;
		this.columns = this.dataSource || [];
		this.pageSize = this.dataSource || 10;
		this.pageSize = this.dataSource || [5, 10, 20, 50];
	}

}
