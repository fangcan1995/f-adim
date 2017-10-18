import { Routes, RouterModule }  from '@angular/router';
import { OrgComponent } from "./org.component";

const routes: Routes = [
  {
    path: '',
    component: OrgComponent,
    children: []
  }
];

export const routing = RouterModule.forChild(routes);
