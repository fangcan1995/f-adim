import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./business-statistic.routing";
import { BusiStatisticComponent } from "./business-statistic.component";
//import { BusiStatisticServer } from "./business-statistic.service";

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
    BusiStatisticComponent,
  ],
  providers: [
    //BusiStatisticServer
  ]
})
export class BusiStatisticModule {
}

