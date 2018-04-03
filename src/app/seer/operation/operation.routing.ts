import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'activity'},
      { path: 'activity', loadChildren:'./activity/activity.module#ActivityModule' },
      { path: 'red-packet', loadChildren:'./red-packet/red-packet.module#RedPacketModule' },
      { path: 'coupon', loadChildren:'./coupon/coupon.module#CouponModule' },

      /*{ path: 'adver-manage', loadChildren:'./adver-manage/adver-manage.module#AdvertisingModule' }*/
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
