import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SystemComponent } from "./system.component";

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      { path: '', redirectTo: 'user-manage'},
      { path: 'user-manage', loadChildren:'./user-manage/user-manage.module#UserManageModule' },
      { path: 'role-manage', loadChildren:'./role-manage/role-manage.module#RoleManageModule' },
      { path: 'resource-manage', loadChildren: './resource-manage/resource-manage.module' },
      { path: 'dict-manage', loadChildren: './dict-manage/dict-manage.module' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
