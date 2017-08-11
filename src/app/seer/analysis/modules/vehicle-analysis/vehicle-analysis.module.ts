import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {DatepickerModule, TabsModule} from 'ng2-bootstrap';

import {VehicleAnalysisRouting} from "./vehicleAnalysis.routing";
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {VehicleAnalysisComponent} from "./vehicleAnalysis.component";
import {VehicleAnalysisHomeComponent} from "./components/vehicle.analysis.home.component";


@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    VehicleAnalysisRouting,

  ],
  declarations: [
    VehicleAnalysisComponent,
    VehicleAnalysisHomeComponent,
  ],
  providers: [

  ]
})
export default class VehicleAnalysisModule {
}

