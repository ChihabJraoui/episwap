import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit
{

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
	            public dialogRef: MatDialogRef<AlertComponent>)
	{
	}

	ngOnInit()
	{
	}

	onConfirm(): void
	{
		this.dialogRef.close(true);
	}

	onDismiss(): void
	{
		this.dialogRef.close(false);
	}

}
