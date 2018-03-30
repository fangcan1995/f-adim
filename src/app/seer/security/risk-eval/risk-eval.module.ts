import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './risk-eval.routing';
import { RiskEvalService } from "./risk-eval.service";
import { RiskEvalComponent } from './risk-eval.component';
import { RiskEvalEditComponent } from './components/risk-eval-edit/risk-eval-edit.component';
import { RiskEvalDetailComponent } from './components/risk-eval-detail/risk-eval-detail.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    RiskEvalComponent,
    RiskEvalEditComponent,
    RiskEvalDetailComponent
  ],
  providers: [
    RiskEvalService,
  ],
})
export class RiskEvalModule {
}
