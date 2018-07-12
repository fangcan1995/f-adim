import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./flow-statistic.routing";
import { FlowStatisticComponent } from "./flow-statistic.component";
//import { FlowStatisticServer } from "./business-statistic.service";

import {Ng2SmartTableModule} from "ng2-smart-table";

import { TimepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    Ng2SmartTableModule,
    TimepickerModule.forRoot()
  ],
  declarations: [
    FlowStatisticComponent,
  ],
  providers: [
    //FlowStatisticServer
  ]
})
export class FlowStatisticModule {
}

