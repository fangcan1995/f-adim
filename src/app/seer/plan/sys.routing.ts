import { Routes, RouterModule }  from '@angular/router';

import {NgModule} from "@angular/core";
import {PlanComponent} from "./plan.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PlanComponent,
    children: [
      { path: '', redirectTo: 'actingmat-plan'},
      { path: 'actingmat-plan', loadChildren:'./modules/actingmat-plan/actingmat-plan.module'},
      { path: 'activity-plan', loadChildren:'./modules/activity-plan/activity.plan.module'},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class planRouting{

}
