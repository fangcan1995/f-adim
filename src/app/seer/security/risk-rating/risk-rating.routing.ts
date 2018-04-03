import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RiskRatingComponent } from './risk-rating.component';
import { RiskRatingEditComponent } from './components/risk-rating-edit/risk-rating-edit.component';
import {RiskRatingDetailComponent} from './components/risk-rating-detail/risk-rating-detail.component';
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
      {
        path: 'detail/:id',
        component: RiskRatingDetailComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
