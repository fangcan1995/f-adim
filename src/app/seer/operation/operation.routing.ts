import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OperationComponent } from './operation.component';

const routes: Routes = [
  {
    path: '',
    component: OperationComponent,
    children: [
      { path: '', redirectTo: 'activity'},
      { path: 'activity', loadChildren:'./activity/activity.module#ActivityModule' },
      { path: 'red-packet', loadChildren:'./red-packet/red-packet.module#RedPacketModule' },
      { path: 'coupon', loadChildren:'./coupon/coupon.module#CouponModule' },
      { path: 'advertising', loadChildren:'./advertising/advertising.module#AdvertisingModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
