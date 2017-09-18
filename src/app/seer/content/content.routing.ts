import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'info-publish'},
      { path: 'info-publish', loadChildren:'./info-publish/info-publish.module#InfoPublishModule' },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
