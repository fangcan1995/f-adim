import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'intention', loadChildren:'./intention/intention.module#IntentionModule' },
      { path: 'target', loadChildren:'./target/target.module#TargetModule' },
      { path: 'project', loadChildren:'./project/project.module#ProjectModule' },
      { path: 'loanBasic', loadChildren:'./loan-basic/loan-basic.module#LoanBasicModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
