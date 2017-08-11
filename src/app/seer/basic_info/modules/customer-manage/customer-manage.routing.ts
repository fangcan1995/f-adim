import { Routes, RouterModule }  from '@angular/router';


import {CustomerEditComponent} from "./components/customer-edit/customer-edit.component";
import {CustomerHomeComponent} from "./components/customer-home/customer-home.component";
import {CustomerManageComponent} from "./customer-manage.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CustomerManageComponent,
    children: [
      { path: '',   component: CustomerHomeComponent},
      { path: 'edit',component :CustomerEditComponent },
      { path: 'edit/:id',component :CustomerEditComponent }

    ]
  }
];

export const customerManageRouting = RouterModule.forChild(routes);
