import { Routes, RouterModule }  from '@angular/router';
import {ActingmatPlanComponent} from "./actingmat-plan.component";
import {ActingmatComponent} from "./components/actingmat.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ActingmatPlanComponent,
    children: [
      { path: '', component: ActingmatComponent},
    ]
  }
];

export const actingmatPlanRouting = RouterModule.forChild(routes);
