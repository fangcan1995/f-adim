import {
  Routes,
  RouterModule
} from '@angular/router';

import { UserComponent } from "./user.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserComponent },
      { path: 'add', component: UserEditComponent },
      { path: 'edit/:id', component: UserEditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
