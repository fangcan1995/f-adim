import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AdvertisingComponent} from "./advertising.component";
import {AdvertisingEditComponent} from "./components/advertising-edit/advertising-edit.component";

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: AdvertisingComponent,
    	},
    	{
    		path: 'add',
    		component: AdvertisingEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: AdvertisingEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
