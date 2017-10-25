import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'advertising'},
      { path: 'advertising', loadChildren:'./advertising/advertising.module#AdvertisingModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
