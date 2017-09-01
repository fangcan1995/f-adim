import {
  Routes,
  RouterModule,
}  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InfoPublishComponent } from './info-publish.component';
import { InfoPublishEditComponent } from './components/info-publish-edit/info-publish-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InfoPublishComponent,
      },
      {
        path: 'add',
        component: InfoPublishEditComponent,
      },
      {
        path: 'edit/:id',
        component: InfoPublishEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
