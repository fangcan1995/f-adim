import { Routes, RouterModule }  from '@angular/router';


import {alertComponent} from "./components/alert.component";
import {AlertManageComponent} from "./alert-manage.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AlertManageComponent,
    children: [
      { path: '', component: alertComponent},
    ]
  }
];

export const alertManageRouting = RouterModule.forChild(routes);
