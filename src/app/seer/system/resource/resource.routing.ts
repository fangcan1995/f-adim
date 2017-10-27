import {
	Routes,
	RouterModule,
} from '@angular/router';

import { ResourceComponent } from './resource.component';
import { ResourceEditComponent } from './components/resource-edit/resource-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '',   component: ResourceComponent},
      { path: 'add',component :ResourceEditComponent },
      { path: 'edit/:id',component :ResourceEditComponent }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
