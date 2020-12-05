import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Directive({
	selector: '[viewAuthorize]'
})
export class AuthorizationDirective
{
	constructor(private templateRef: TemplateRef<any>,
				private viewContainer: ViewContainerRef,
				private authorizationService: AuthorizationService)
	{
	}

	@Input() set viewAuthorize(permission: string[])
	{
		this.viewContainer.clear();

		const isAllowed = this.authorizationService.hasPermission(permission);

		if (isAllowed === true)
		{
			this.viewContainer.createEmbeddedView(this.templateRef);
		}
	}
}
