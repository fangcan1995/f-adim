import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";
import {SupplierAnalysisComponent} from "./supplier-analysis.component";
import {SupplierAnalysisHomeComponent} from "./components/home/supplier-analysis-home.component";



export const routes: Routes = [
  {
    path: '',
    component: SupplierAnalysisComponent,
    children: [
      { path: '', component: SupplierAnalysisHomeComponent},
      /*      { path: 'vehicle-analysis', loadChildren:'./modules/vehicle-analysis/vehicle-analysis.module' },*/
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierAnalysisRouting{

}


