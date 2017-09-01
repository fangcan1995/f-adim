import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';
import { MessageAddComponent } from './components/message-add/message-add.component';
const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MessageComponent,
    	},
    	{
    		path: 'add',
    		component: MessageAddComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: MessageEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
