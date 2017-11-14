import { NgModule } from '@angular/core';

import {FileUploadModule} from "ng2-file-upload";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";
import {AuditProcessComponent} from "./base-component/audit-process/audit-process.component";
import {AuditOperationComponent} from "./base-component/audit-operation/audit-operation.component";
import {AuditMaterialComponent} from "./base-component/audit-material/audit-material.component";
import {CreditInfoComponent} from "./base-component/credit-info/credit-info.component";
import {LoanInfoComponent} from "./base-component/loan-info/loan-info.component";
import {PawnInfoComponent} from "./base-component/pawn-info/pawn-info.component";
import {MemberInfoComponent} from "./base-component/member-info/member-info.component";
import {InvestRecordComponent} from "./base-component/invest-record/invest-record.component";
import {CommonService} from "./common.service";
import {routing} from "./common.routing";
import {CreateIntentionComponent} from "./biz-component/create-intention/create-intention.component";
import {DetailComponent} from "./biz-component/detail/detail.component";
import {IntentionCompletionComponent} from "./biz-component/intention-completion/intention-completion.component";
import {FirstAuditComponent} from "./biz-component/first-audit/first-audit.component";
import {SecondAuditComponent} from "./biz-component/second-audit/second-audit.component";
import {FillAuditComponent} from "./biz-component/fill-audit/fill-audit.component";
import {PrepaymentComponent} from "./biz-component/prepayment-audit/prepayment-audit.component";
import {ReleaseComponent} from "./biz-component/release/release.component";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    FileUploadModule,
    routing,
  ],
  declarations: [
    CreateIntentionComponent,
    DetailComponent,
    IntentionCompletionComponent,
    FirstAuditComponent,
    SecondAuditComponent,
    AuditProcessComponent,
    AuditOperationComponent,
    AuditMaterialComponent,
    CreditInfoComponent,
    LoanInfoComponent,
    PawnInfoComponent,
    MemberInfoComponent,
    InvestRecordComponent,
    FillAuditComponent,
    PrepaymentComponent,
    ReleaseComponent
  ],
  providers: [
    CommonService
  ],
  exports: []
})
export class CommonModule {
}
