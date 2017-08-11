import { Routes, RouterModule }  from '@angular/router';
import { CriteriaComponent } from './criteria.component';
import {NgModule} from "@angular/core";
import {CriteriaHomeComponent} from "./criteria-home/criteria-home.component";

export const routes: Routes = [

  {
    path: 'seer',
    component: CriteriaComponent,
    children:
      [
        { path: 'standard', component: CriteriaHomeComponent },
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriteriaRoutingModule {
}

