import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './target.routing';
import { TargetService } from "./target.service";

import { TargetComponent } from './target.component';
import {CommonService} from "../common/common.service";
import {MemberService} from "../../basic-info/member/member.service";
import {SeerMessageService} from "../../../theme/services/seer-message.service";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    TargetComponent,
  ],
  providers: [
    TargetService,
    CommonService,
    MemberService,
    SeerMessageService

  ],
})
export class TargetModule {
}
