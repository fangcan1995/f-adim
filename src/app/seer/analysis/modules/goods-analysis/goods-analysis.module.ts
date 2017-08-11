import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {DatepickerModule, TabsModule} from 'ng2-bootstrap';
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {GoodsAnalysisRouting} from "./goods-analysis.routing";
import {GoodsAnalysisComponent} from "./goods-analysis.component";
import {GoodsAnalysisHomeComponent} from "./components/home/goods-analysis-home.component";



@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    GoodsAnalysisRouting,
  ],
  declarations: [
    GoodsAnalysisComponent,
    GoodsAnalysisHomeComponent,
  ],
  providers: [

  ]
})
export default class GoodsAnalysisModule {
}




