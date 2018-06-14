import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

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
import {RepaymentAuditComponent} from "./repayment-audit/repayment-audit.component";
const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'loan-apply',component: LoanApplyComponent,},
      {path: 'loan-complete-audit/:id',component: LoanCompleteAuditComponent,},
      {path: 'loan-first-audit/:id',component: LoanFirstAuditComponent,},
      {path: 'loan-second-audit/:id',component: LoanSecondAuditComponent,},
      {path: 'loan-view/:id',component: LoanViewComponent,},

      {path: 'project-release/:id',component: ProjectReleaseComponent,},
      {path: 'project-full-audit/:id',component: ProjectFullAuditComponent,},
      {path: 'project-view/:id',component: ProjectViewComponent,},

      {path: 'transfer-view/:id',component: TransferViewComponent,},
      {path: 'transfer-audit/:id',component: TransferAuditComponent,},
      {path: 'repayment-audit/:id',component: RepaymentAuditComponent,},

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
