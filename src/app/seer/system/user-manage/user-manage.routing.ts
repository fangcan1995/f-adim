import {
  Routes,
  RouterModule
} from '@angular/router';

import { UserManageComponent } from "./user-manage.component";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { UserAddedDialogComponent } from "./components/user-added-dialog/user-added-dialog.component";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UserManageComponent,
    children: [
      { path: '', component: UserHomeComponent},
      { path: 'edit/:id', component: UserEditComponent},
      { path: 'add', component: UserAddedDialogComponent},
    ]
  }
];

export const userManageRouting = RouterModule.forChild(routes);
