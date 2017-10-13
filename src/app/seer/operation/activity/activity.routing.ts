import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ActivityComponent } from './activity.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
import { ActivityAddComponent } from './components/activity-add/activity-add.component';
const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: ActivityComponent,
    	},
    	{
    		path: 'add',
    		component: ActivityEditComponent,
    	},
    	{
    		path: 'edit',
    		component: ActivityAddComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
