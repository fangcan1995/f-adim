import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RiskRatingComponent } from './risk-rating.component';
import { RiskRatingEditComponent } from './components/risk-rating-edit/risk-rating-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: RiskRatingComponent,
    	},
    	{
    		path: 'add',
    		component: RiskRatingEditComponent,
    	},
    	{
    		path: 'edit/:id',
    		component: RiskRatingEditComponent,
    	},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
