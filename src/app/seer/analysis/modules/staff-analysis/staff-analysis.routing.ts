import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";

import {StaffAnalysisComponent} from "./staff-analysis.component";
import {StaffAnalysisHomeComponent} from "./components/home/staff-analysis-home.component";



export const routes: Routes = [
  {
    path: '',
    component: StaffAnalysisComponent,
    children: [
      { path: '', component: StaffAnalysisHomeComponent},
      /*      { path: 'vehicle-analysis', loadChildren:'./modules/vehicle-analysis/vehicle-analysis.module' },*/
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffAnalysisRouting{

}



