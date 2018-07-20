import { Routes, RouterModule }  from '@angular/router';
import { InvestStatisticComponent } from "./invest-statistic.component";

const routes: Routes = [
  {
    path: '',
    component: InvestStatisticComponent,
    children: []
  }
];

export const routing = RouterModule.forChild(routes);
