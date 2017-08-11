import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {DatepickerModule, TabsModule} from 'ng2-bootstrap';
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {SupplierAnalysisRouting} from "./supplier-analysis.routing";
import {SupplierAnalysisComponent} from "./supplier-analysis.component";
import {SupplierAnalysisHomeComponent} from "./components/home/supplier-analysis-home.component";




@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    SupplierAnalysisRouting,
  ],
  declarations: [
    SupplierAnalysisComponent,
    SupplierAnalysisHomeComponent,
  ],
  providers: [

  ]
})
export default class SupplierAnalysisModule {
}


