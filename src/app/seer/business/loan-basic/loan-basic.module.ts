import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './loan-basic.routing';
import {LoanBasicService} from "./loan-basic.service";
import {LoanBasicComponent} from "./loan-basic.component";
import {MemberInfoComponent} from "./component/member-info/member-info.component";
import {AuditMaterialComponent} from "./component/audit-material/audit-material.component";
import {AuditOperationComponent} from "./component/audit-operation/audit-operation.component";
import {AuditProcessComponent} from "./component/audit-process/audit-process.component";
import {CreditInfoComponent} from "./component/credit-info/credit-info.component";
import {InvestRecordComponent} from "./component/invest-record/invest-record.component";
import {LoanInfoComponent} from "./component/loan-info/loan-info.component";
import {PwanInfoComponent} from "./component/pwan-info/pwan-info.component";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
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
    PwanInfoComponent,
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
    PwanInfoComponent,
  ]
})
export class LoanBasicModule {
}
