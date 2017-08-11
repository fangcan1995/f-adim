import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";
import {VehicleAnalysisComponent} from "./vehicleAnalysis.component";
import {VehicleAnalysisHomeComponent} from "./components/vehicle.analysis.home.component";


export const routes: Routes = [
  {
    path: '',
    component: VehicleAnalysisComponent,
    children: [
      { path: '', component: VehicleAnalysisHomeComponent},
/*      { path: 'vehicle-analysis', loadChildren:'./modules/vehicle-analysis/vehicle-analysis.module' },*/
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleAnalysisRouting{

}

