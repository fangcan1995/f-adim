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
      { path: 'user', loadChildren:'./user/user.module#UserModule' },
      { path: 'role', loadChildren:'./role/role.module#RoleModule' },
      { path: 'resource', loadChildren: './resource/resource.module#ResourceModule' },
      { path: 'dict', loadChildren: './dict/dict.module#DictModule' },
      { path: 'plan', loadChildren: './plan/plan.module#PlanModule' }, 
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
