import { Routes, RouterModule }  from '@angular/router';
import {StaffComponent} from "./components/staff.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StaffComponent },
    ]
  }
];

export const staffManageRouting = RouterModule.forChild(routes);
