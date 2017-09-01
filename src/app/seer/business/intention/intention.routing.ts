import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IntentionComponent } from './intention.component';
import { IntentionEditComponent } from './components/intention-edit/intention-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: IntentionComponent,
    	},
    	{
    		path: 'add',
    		component: IntentionEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: IntentionEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
