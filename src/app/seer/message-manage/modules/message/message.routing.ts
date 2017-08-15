import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MessageComponent } from "./message.component";

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MessageComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
