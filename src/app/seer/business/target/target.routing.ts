import {
  Routes,
  RouterModule,
}  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TargetComponent } from './target.component';
import { TargetEditComponent } from './components/target-edit/target-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TargetComponent,
      },
      {
        path: 'add',
        component: TargetEditComponent,
      },
      {
        path: 'edit/:id',
        component: TargetEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
