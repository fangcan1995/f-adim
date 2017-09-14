import { Routes, RouterModule }  from '@angular/router';

import { RoleComponent } from "./role.component";
import { RoleEditComponent } from "./components/role-edit/role-edit.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: RoleComponent },
      { path: 'add', component: RoleEditComponent },
      { path: 'edit/:roleId', component: RoleEditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
