import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ActivityComponent } from './activity.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: ActivityComponent,
    	},
    	{
    		path: 'edit',
    		component: ActivityEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
