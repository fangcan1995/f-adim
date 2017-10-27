import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'user-manage'},
      { path: 'user-manage', loadChildren:'./user-manage/user-manage.module#UserManageModule' },
      { path: 'role', loadChildren:'./role/role.module#RoleModule' },
      { path: 'resource', loadChildren: './resource/resource.module#ResourceModule' },
      { path: 'dict', loadChildren: './dict/dict.module#DictModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
