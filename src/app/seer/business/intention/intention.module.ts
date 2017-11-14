import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './intention.routing';
import { IntentionComponent } from './intention.component';
import { IntentionService } from "./intention.service";
import {MemberService} from "../../basic-info/member/member.service";
import {CommonService} from "../common/common.service";



@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing
  ],
  declarations: [
    IntentionComponent,
  ],
  providers: [
    IntentionService,
    CommonService,
    MemberService

  ],
  exports: [

  ]
})
export class IntentionModule {
}
