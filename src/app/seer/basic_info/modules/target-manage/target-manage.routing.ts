import { Routes, RouterModule }  from '@angular/router';


import {TargetComponent} from "./components/target.component";
import {TargetManageComponent} from "./target-manage.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TargetManageComponent,
    children: [
      { path: '', component: TargetComponent},
    ]
  }
];

export const targetManageRouting = RouterModule.forChild(routes);
