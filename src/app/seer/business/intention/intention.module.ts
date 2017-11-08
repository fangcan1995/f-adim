import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './intention.routing';
import { IntentionComponent } from './intention.component';
import { IntentionService } from "./intention.service";

import {IntentionCompletionComponent} from "./components/intention-completion/intention-completion.component";
import {LoanBasicModule} from "../loan-basic/loan-basic.module";
import {FirstAuditComponent} from "./components/first-audit/first-audit.component";
import {SecondAuditComponent} from "./components/second-audit/second-audit.component";



@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    LoanBasicModule
  ],
  declarations: [
    IntentionComponent,
    IntentionCompletionComponent,
    FirstAuditComponent,
    SecondAuditComponent
  ],
  providers: [
    IntentionService,
  ],
  exports: [
  ]
})
export class IntentionModule {
}
