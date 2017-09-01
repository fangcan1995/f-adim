import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CouponComponent } from './coupon.component';
import { CouponEditComponent } from './components/coupon-edit/coupon-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: CouponComponent,
    	},
    	{
    		path: 'add',
    		component: CouponEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: CouponEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
