import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CouponComponent } from './coupon.component';
import { CouponEditComponent } from './components/coupon-edit/coupon-edit.component';
import { CouponAddComponent } from './components/coupon-add/coupon-add.component';

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
    		path: 'edit',
    		component: CouponAddComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
