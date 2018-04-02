import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RiskEvalComponent } from './risk-eval.component';
import { RiskEvalEditComponent } from './components/risk-eval-edit/risk-eval-edit.component';
import { RiskEvalDetailComponent } from './components/risk-eval-detail/risk-eval-detail.component';
const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: RiskEvalComponent,
    	},
    	{
    		path: 'add',
    		component: RiskEvalEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: RiskEvalEditComponent,
    	},
      {
        path: 'edit/:id',
        component: RiskEvalDetailComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
