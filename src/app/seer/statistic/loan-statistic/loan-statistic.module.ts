import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./loan-statistic.routing";
import { LoanStatisticComponent } from "./loan-statistic.component";
//import { LoanStatisticServer } from "./loan-statistic.service";

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
    LoanStatisticComponent,
  ],
  providers: [
    //LoanStatisticServer
  ]
})
export class LoanStatisticModule {
}

