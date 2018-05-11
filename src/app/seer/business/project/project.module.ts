import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './project.routing';
import { ProjectService } from "./project.service";

import { ProjectComponent } from './project.component';
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
    ProjectComponent,
  ],
  providers: [
    ProjectService,
    CommonService,
    MemberService,
    SeerMessageService

  ],
})
export class ProjectModule {
}
