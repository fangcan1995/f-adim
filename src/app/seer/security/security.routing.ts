import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'risk-eval'},
      { path: 'risk-eval', loadChildren:'./risk-eval/risk-eval.module#RiskEvalModule' },
      { path: 'risk-rating', loadChildren:'./risk-rating/risk-rating.module#RiskRatingModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
