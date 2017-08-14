import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MemberComponent } from "./member.component";

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MemberComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
