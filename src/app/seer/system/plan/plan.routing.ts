import {
  Routes,
  RouterModule
} from '@angular/router';

import { UserComponent } from "./plan.component";
import { UserEditComponent } from "./components/plan-edit/plan-edit.component";
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserComponent },
      { path: 'add', component: UserEditComponent },
      { path: 'edit/:params', component: UserEditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
