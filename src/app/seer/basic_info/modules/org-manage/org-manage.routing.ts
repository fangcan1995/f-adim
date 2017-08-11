import { Routes, RouterModule }  from '@angular/router';
import {OrgManageComponent} from "./org-manage.component";

const routes: Routes = [
  {
    path: '',
    component: OrgManageComponent,
    children: []
  }
];

export const orgManageRouting = RouterModule.forChild(routes);
