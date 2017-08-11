import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";
import {AnalysisComponent} from "./analysis.component";


//,customer-analysis,staff-analysis,supplier-analysis,goods-analysis
export const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent,
    children: [
      { path: '', redirectTo: 'vehicle-analysis'},
      { path: 'vehicle-analysis', loadChildren:'./modules/vehicle-analysis/vehicle-analysis.module' },
      { path: 'customer-analysis', loadChildren:'./modules/customer-analysis/customer-analysis.module' },
      { path: 'staff-analysis', loadChildren:'./modules/staff-analysis/staff-analysis.module' },
      { path: 'supplier-analysis', loadChildren:'./modules/supplier-analysis/supplier-analysis.module' },
      { path: 'goods-analysis', loadChildren:'./modules/goods-analysis/goods-analysis.module' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class analysisRouting{

}
