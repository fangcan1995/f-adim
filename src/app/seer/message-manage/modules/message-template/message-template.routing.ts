import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MessageTemplateComponent } from "./message-template.component";

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MessageTemplateComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
