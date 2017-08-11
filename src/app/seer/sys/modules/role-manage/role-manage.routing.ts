import { Routes, RouterModule }  from '@angular/router';

import {RoleManageComponent} from "./role-manage.component";
import {RoleHomeComponent} from "./components/role-home/role-home.component";
import {RoleEditComponent} from "./components/role-edit/role-edit.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: RoleManageComponent,
    children: [
      { path: '', component: RoleHomeComponent},
      { path: 'role', component: RoleEditComponent},
      { path: 'role/:roleId', component: RoleEditComponent},
    ]
  }
];

export const roleManageRouting = RouterModule.forChild(routes);
