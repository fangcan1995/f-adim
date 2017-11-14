import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {IntentionCompletionComponent} from "./biz-component/intention-completion/intention-completion.component";
import {FirstAuditComponent} from "./biz-component/first-audit/first-audit.component";
import {SecondAuditComponent} from "./biz-component/second-audit/second-audit.component";
import {DetailComponent} from "./biz-component/detail/detail.component";
import {CreateIntentionComponent} from "./biz-component/create-intention/create-intention.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'create',component: CreateIntentionComponent,},
      {path: 'detail/:id',component: DetailComponent,},
      {path: 'completion/:id',component: IntentionCompletionComponent,},
      {path: 'firstAudit/:id',component: FirstAuditComponent,},
      {path: 'secondAudit/:id',component: SecondAuditComponent,},
      {path: 'fillAudit/:id',component: SecondAuditComponent,},
      {path: 'prepayAudit/:id',component: SecondAuditComponent,},
      {path: 'release/:id',component: SecondAuditComponent,},
      {path: 'terminate/:id',component: SecondAuditComponent,},


    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
