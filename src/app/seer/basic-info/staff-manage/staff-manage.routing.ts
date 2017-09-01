import { Routes, RouterModule }  from '@angular/router';


import {StaffComponent} from "./components/staff.component";
import {StaffManageComponent} from "./staff-manage.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: StaffManageComponent,
    children: [
      { path: '', component: StaffComponent},
    ]
  }
];

export const staffManageRouting = RouterModule.forChild(routes);
