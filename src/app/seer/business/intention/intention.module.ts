import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './intention.routing';
import { IntentionComponent } from './intention.component';
import { IntentionService } from "./intention.service";

import {IntentionCompletionComponent} from "./components/intention-completion/intention-completion.component";
import {FirstAuditComponent} from "./components/first-audit/first-audit.component";
import {SecondAuditComponent} from "./components/second-audit/second-audit.component";
import {CommonModule} from "../common/common.module";
import {DetailComponent} from "./components/detail/detail.component";
import {CreateIntentionComponent} from "./components/create-intention/create-intention.component";
import {MemberService} from "../../basic-info/member/member.service";
import {SelectModule} from "ng2-select";



@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    CommonModule,
    routing
  ],
  declarations: [
    IntentionComponent,
    IntentionCompletionComponent,
    FirstAuditComponent,
    SecondAuditComponent,
    DetailComponent,
    CreateIntentionComponent
  ],
  providers: [
    IntentionService,
    MemberService
  ],
  exports: [
  ]
})
export class IntentionModule {
}
