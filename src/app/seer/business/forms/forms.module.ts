import { NgModule } from '@angular/core';

import {FileUploadModule} from "ng2-file-upload";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";
import {routing} from "./forms.routing";
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgxCurrencyModule} from "ngx-currency";

import {FormsService} from "./forms.service";
import {LoanFirstAuditComponent} from "./loan-first-audit/loan-first-audit.component";
import {LoanApplyComponent} from "./loan-apply/loan-apply.component";
import {LoanCompleteAuditComponent} from "./loan-complete-audit/loan-complete-audit.component";
import {LoanSecondAuditComponent} from "./loan-second-audit/loan-second-audit.component";
import {ProjectReleaseComponent} from "./project-release-audit/project-release.component";
import {ProjectFullAuditComponent} from "./project-full-audit/project-full-audit.component";
import {LoanViewComponent} from "./loan-view/loan-view.component";
import {ProjectViewComponent} from "./project-view/project-view.component";
import {TransferViewComponent} from "./transfer-view/transfer-view.component";
import {TransferAuditComponent} from "./transfer-audit/transfer-audit.component";
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    FileUploadModule,
    routing,
    CustomFormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoanApplyComponent,
    LoanCompleteAuditComponent,
    LoanFirstAuditComponent,
    LoanSecondAuditComponent,
    LoanViewComponent,
    ProjectReleaseComponent,
    ProjectFullAuditComponent,
    ProjectViewComponent,
    TransferViewComponent,
    TransferAuditComponent
  ],
  providers: [
    FormsService
  ],
  exports: []
})
export class FormsModule {
}
