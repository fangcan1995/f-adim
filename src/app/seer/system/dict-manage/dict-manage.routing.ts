import {
  Routes,
  RouterModule,
} from '@angular/router';

import { DictComponent } from "./components/dict.component";
import { DictManageComponent } from "./dict-manage.component";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DictManageComponent,
    children: [
      { path: '', component: DictComponent},
    ]
  }
];

export const dictManageRouting = RouterModule.forChild(routes);
