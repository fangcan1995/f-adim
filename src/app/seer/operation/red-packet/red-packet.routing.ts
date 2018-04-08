import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RedPacketComponent } from './red-packet.component';

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: RedPacketComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
