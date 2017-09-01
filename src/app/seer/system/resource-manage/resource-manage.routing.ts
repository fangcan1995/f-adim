import {
	Routes,
	RouterModule,
} from '@angular/router';

import { ResourceManageComponent } from "./resource-manage.component";
import { ResourceHomeComponent } from "./components/resource-home/resource-home.component";
import { ResourceEditComponent } from "./components/resource-edit/resource-edit.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ResourceManageComponent,
    children: [
      { path: '',   component: ResourceHomeComponent},
      { path: 'edit',component :ResourceEditComponent },
      { path: 'edit/:id',component :ResourceEditComponent }

    ]
  }
];

export const resourceManageRouting = RouterModule.forChild(routes);
