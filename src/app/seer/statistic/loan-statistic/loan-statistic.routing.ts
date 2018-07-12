import { Routes, RouterModule }  from '@angular/router';
import { LoanStatisticComponent } from "./loan-statistic.component";

const routes: Routes = [
  {
    path: '',
    component: LoanStatisticComponent,
    children: []
  }
];

export const routing = RouterModule.forChild(routes);
