import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IntentionComponent } from './intention.component';
import {IntentionCompletionComponent} from "./components/intention-completion/intention-completion.component";
import {FirstAuditComponent} from "./components/first-audit/first-audit.component";
import {SecondAuditComponent} from "./components/second-audit/second-audit.component";

const routes: Routes = [
  {
    path: '',
    children: [
    	{path: '', component: IntentionComponent},
      {path: 'completion/:id',component: IntentionCompletionComponent,},
      {path: 'firstAudit/:id',component: FirstAuditComponent,},
      {path: 'secondAudit/:id',component: SecondAuditComponent,},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
