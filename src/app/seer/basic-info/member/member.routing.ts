import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MemberComponent } from './member.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component'

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MemberComponent,
    	},
    	{
    		path: 'add',
    		component: MemberEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: MemberEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
