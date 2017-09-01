import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './risk-eval.routing';
import { RiskEvalService } from "./risk-eval.service";
import { RiskEvalComponent } from './risk-eval.component';
import { RiskEvalEditComponent } from './components/risk-eval-edit/risk-eval-edit.component';

@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    RiskEvalComponent,
    RiskEvalEditComponent,
  ],
  providers: [
    RiskEvalService,
  ],
})
export class RiskEvalModule {
}
