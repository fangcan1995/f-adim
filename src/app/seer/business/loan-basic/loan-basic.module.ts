import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import {LoanBasicService} from "./loan-basic.service";
import {LoanBasicComponent} from "./loan-basic.component";
import {MemberInfoComponent} from "./component/member-info/member-info.component";
import {AuditMaterialComponent} from "./component/audit-material/audit-material.component";
import {AuditOperationComponent} from "./component/audit-operation/audit-operation.component";
import {AuditProcessComponent} from "./component/audit-process/audit-process.component";
import {CreditInfoComponent} from "./component/credit-info/credit-info.component";
import {InvestRecordComponent} from "./component/invest-record/invest-record.component";
import {LoanInfoComponent} from "./component/loan-info/loan-info.component";
import {PawnInfoComponent} from "./component/pawn-info/pawn-info.component";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    LoanBasicComponent,
    AuditMaterialComponent,
    AuditOperationComponent,
    AuditProcessComponent,
    CreditInfoComponent,
    InvestRecordComponent,
    LoanInfoComponent,
    MemberInfoComponent,
    PawnInfoComponent,
  ],
  providers: [
    LoanBasicService,
  ],
  exports: [
    AuditMaterialComponent,
    AuditOperationComponent,
    AuditProcessComponent,
    CreditInfoComponent,
    InvestRecordComponent,
    LoanInfoComponent,
    MemberInfoComponent,
    PawnInfoComponent,
  ]
})
export class LoanBasicModule {
}
