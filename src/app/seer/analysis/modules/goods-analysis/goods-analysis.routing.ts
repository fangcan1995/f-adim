import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";
import {GoodsAnalysisComponent} from "./goods-analysis.component";
import {GoodsAnalysisHomeComponent} from "./components/home/goods-analysis-home.component";





export const routes: Routes = [
  {
    path: '',
    component: GoodsAnalysisComponent,
    children: [
      { path: '', component: GoodsAnalysisHomeComponent},
      /*      { path: 'vehicle-analysis', loadChildren:'./modules/vehicle-analysis/vehicle-analysis.module' },*/
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsAnalysisRouting{

}




