import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./invest-statistic.routing";
import { InvestStatisticComponent } from "./invest-statistic.component";
//import { InvestStatisticServer } from "./invest-statistic.service";

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
    InvestStatisticComponent,
  ],
  providers: [
    //InvestStatisticServer
  ]
})
export class InvestStatisticModule {
}

