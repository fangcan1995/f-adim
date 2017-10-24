import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';
import {MessageDetailComponent} from './components/message-detail/message-detail.component';
const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MessageComponent,
    	},
    	{
    		path: 'edit',
    		component: MessageEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: MessageEditComponent,
    	},
      {
        path: 'detail/:id',
        component: MessageDetailComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
