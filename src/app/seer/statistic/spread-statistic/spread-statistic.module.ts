import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./spread-statistic.routing";
import { SpreadStatisticComponent } from "./spread-statistic.component";
//import { SpreadStatisticServer } from "./spread-statistic.service";

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
    SpreadStatisticComponent,
  ],
  providers: [
    //SpreadStatisticServer
  ]
})
export class SpreadStatisticModule {
}

