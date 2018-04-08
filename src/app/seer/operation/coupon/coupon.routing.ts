import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CouponComponent } from './coupon.component';

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: CouponComponent,
    	}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
