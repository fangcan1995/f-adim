import { Routes, RouterModule }  from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffEditComponent } from './components/staff-edit/staff-edit.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StaffComponent },
      { path: 'add', component: StaffEditComponent },
      { path: 'edit/:id', component: StaffEditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
