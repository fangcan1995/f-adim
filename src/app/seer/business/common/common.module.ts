import { NgModule } from '@angular/core';

import {FileUploadModule} from "ng2-file-upload";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";
import {AuditProcessComponent} from "./component/audit-process/audit-process.component";
import {AuditOperationComponent} from "./component/audit-operation/audit-operation.component";
import {AuditMaterialComponent} from "./component/audit-material/audit-material.component";
import {CreditInfoComponent} from "./component/credit-info/credit-info.component";
import {LoanInfoComponent} from "./component/loan-info/loan-info.component";
import {PawnInfoComponent} from "./component/pawn-info/pawn-info.component";
import {MemberInfoComponent} from "./component/member-info/member-info.component";
import {InvestRecordComponent} from "./component/invest-record/invest-record.component";
import {CommonService} from "./common.service";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    AuditProcessComponent,
    AuditOperationComponent,
    AuditMaterialComponent,
    CreditInfoComponent,
    LoanInfoComponent,
    PawnInfoComponent,
    MemberInfoComponent,
    InvestRecordComponent
  ],
   providers: [
    CommonService,
  ],
  exports: [
    AuditProcessComponent,
    AuditOperationComponent,
    AuditMaterialComponent,
    CreditInfoComponent,
    LoanInfoComponent,
    PawnInfoComponent,
    MemberInfoComponent,
    InvestRecordComponent
  ]
})
export class CommonModule {
}
