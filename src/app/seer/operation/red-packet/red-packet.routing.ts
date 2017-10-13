import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RedPacketComponent } from './red-packet.component';
import { RedPacketEditComponent } from './components/red-packet-edit/red-packet-edit.component';
import { RedPacketAddComponent } from './components/red-packet-add/red-packet-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: RedPacketComponent,
    	},
    	{
    		path: 'add',
    		component: RedPacketEditComponent,
    	},
    	{
    		path: 'edit',
    		component: RedPacketAddComponent  ,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
