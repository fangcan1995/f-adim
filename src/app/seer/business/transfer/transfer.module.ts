import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './transfer.routing';
import { TransferService } from "./transfer.service";

import { TransferComponent } from './transfer.component';
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
    TransferComponent,
  ],
  providers: [
    TransferService,
    CommonService,
    MemberService,
    SeerMessageService

  ],
})
export class TransferModule {
}
