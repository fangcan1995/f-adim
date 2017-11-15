import { Routes, RouterModule }  from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffEditComponent } from './components/staff-edit/staff-edit.component';
import {StaffAddComponent} from "./components/staff-add/staff-add.component"
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StaffComponent },
      { path: 'add', component: StaffAddComponent },
      { path: 'edit/:id', component: StaffEditComponent },
      { path: 'detail/:id', component: StaffEditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
