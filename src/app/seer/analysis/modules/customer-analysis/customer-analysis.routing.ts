import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";
import {CustomerAnalysisComponent} from "./customer-analysis.component";
import {CustomerAnalysisHomeComponent} from "./components/home/customer-analysis-home.component";






export const routes: Routes = [
  {
    path: '',
    component: CustomerAnalysisComponent,
    children: [
      { path: '', component: CustomerAnalysisHomeComponent},
      /*      { path: 'vehicle-analysis', loadChildren:'./modules/vehicle-analysis/vehicle-analysis.module' },*/
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAnalysisRouting{

}





