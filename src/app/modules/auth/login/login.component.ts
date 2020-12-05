import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../core/utils/navigation/navigation.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AuthFacade} from '../../../core/facades/authentication.facade';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
	loading$: Observable<boolean>;
	error$: Observable<string>;

	public defaultElevation = 5;
	public raisedElevation = 20;

	public signInForm: FormGroup;
	public payload;
	public spinnerIsActivated = false;
	public errorMessage = false;

	constructor(private readonly navigationService: NavigationService,
	            private readonly formBuilder: FormBuilder,
	            private readonly authFacade: AuthFacade)
	{
		this.loading$ = authFacade.getLoading();
		this.error$ = authFacade.getError();
	}

	get email()
	{
		return this.signInForm.get('email');
	}

	get password()
	{
		return this.signInForm.get('password');
	}

	// *** Lifecycle *** //
	ngOnInit()
	{
		this.signInForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	onSubmit()
	{
		if(this.signInForm.valid)
		{

			this.payload = {
				email: this.signInForm.value.email,
				password: this.signInForm.value.password,
			};

			this.authFacade.login(this.payload)
		}
	}
}
