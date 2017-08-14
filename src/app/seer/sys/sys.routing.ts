import { Routes, RouterModule }  from '@angular/router';

import { SysComponent } from './sys.component';
import {NgModule} from "@angular/core";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SysComponent,
    children: [
      { path: '', redirectTo: 'user-manage'},
      { path: 'alert-manage', loadChildren:'./modules/alert-manage/alert-manage.module' },
      { path: 'user-manage', loadChildren:'./modules/user-manage/user-manage.module#UserManageModule' },
      { path: 'role-manage', loadChildren:'./modules/role-manage/role-manage.module#RoleManageModule' },
      { path: 'resource-manage', loadChildren: './modules/resource-manage/resource-manage.module' },
      { path: 'dict-manage', loadChildren: './modules/dict-manage/dict-manage.module' },
      { path: 'template-manage', loadChildren: './modules/template-manage/template-manage.module#TemplateManageModule' },
      { path: 'company-manage', loadChildren: './modules/company-manage/company.manage.module' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class sysRouting{

}
