import { Routes, RouterModule }  from '@angular/router';
import { StaffComponent } from "./staff.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StaffComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
