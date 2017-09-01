import {
  Routes,
  RouterModule,
}  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: 'add',
        component: ProjectEditComponent,
      },
      {
        path: 'edit/:id',
        component: ProjectEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
