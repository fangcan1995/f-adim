import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './subject.routing';
import { SubjectService } from "./subject.service";

import { SubjectComponent } from './subject.component';
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
    SubjectComponent,
  ],
  providers: [
    SubjectService,
    CommonService,
    MemberService,
    SeerMessageService

  ],
})
export class LoanSubjectModule {
}
