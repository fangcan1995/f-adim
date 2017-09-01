import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', redirectTo: 'info-publish'},
      { path: 'info-publish', loadChildren:'./info-publish/info-publish.module#InfoPublishModule' },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
