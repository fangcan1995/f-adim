import {
  Routes,
  RouterModule,
}  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ParameterComponent } from './parameter.component';
import { ParameterEditComponent } from './components/parameter-edit/parameter-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ParameterComponent,
      },
      {
        path: 'add',
        component: ParameterEditComponent,
      },
      {
        path: 'edit/:id',
        component: ParameterEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
