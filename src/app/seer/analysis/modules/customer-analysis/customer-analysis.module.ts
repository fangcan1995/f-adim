import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {DatepickerModule, TabsModule} from 'ng2-bootstrap';
import {sharedModule} from "../../../common/shared.module";
import {NgaModule} from "../../../../theme/nga.module";
import {CustomerAnalysisRouting} from "./customer-analysis.routing";
import {CustomerAnalysisComponent} from "./customer-analysis.component";
import {CustomerAnalysisHomeComponent} from "./components/home/customer-analysis-home.component";




@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    CustomerAnalysisRouting,
  ],
  declarations: [
    CustomerAnalysisComponent,
    CustomerAnalysisHomeComponent,
  ],
  providers: [

  ]
})
export default class CustomerAnalysisModule {
}





