import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {DatepickerModule, TabsModule} from 'ng2-bootstrap';
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {StaffAnalysisRouting} from "./staff-analysis.routing";
import {StaffAnalysisComponent} from "./staff-analysis.component";
import {StaffAnalysisHomeComponent} from "./components/home/staff-analysis-home.component";





@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    StaffAnalysisRouting,
  ],
  declarations: [
    StaffAnalysisComponent,
    StaffAnalysisHomeComponent,
  ],
  providers: [

  ]
})
export default class StaffAnalysisModule {
}



