import { Routes, RouterModule }  from '@angular/router';
import {ContratManageComponent} from "./contrat-manage.component";
import {contractListComponent} from "./components/list/contratList.component";






const routes: Routes = [
  {
    path: '',
    component: ContratManageComponent,
    children: [
      { path: '', component: contractListComponent},
    ]
  }
];

export const contratManageRouting = RouterModule.forChild(routes);
