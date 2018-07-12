import {
    Routes,
    RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        children: [
            { 
                path: '', redirectTo: 'business-statistic'
            },
            {
                path: 'business-statistic',
                loadChildren: './business-statistic/business-statistic.module#BusiStatisticModule'
            },
            {
                path: 'flow-statistic',
                loadChildren: './flow-statistic/flow-statistic.module#FlowStatisticModule'
            },
            {
                path: 'invest-statistic',
                loadChildren: './invest-statistic/invest-statistic.module#InvestStatisticModule'
            },
            {
                path: 'loan-statistic',
                loadChildren: './loan-statistic/loan-statistic.module#LoanStatisticModule'
            },
            {
                path: 'spread-statistic',
                loadChildren: './spread-statistic/spread-statistic.module#SpreadStatisticModule'
            },

        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
