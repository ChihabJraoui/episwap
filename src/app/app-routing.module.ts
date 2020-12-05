import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule
{
}
