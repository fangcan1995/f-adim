import { Routes, RouterModule }  from '@angular/router';
import { BusiStatisticComponent } from "./business-statistic.component";

const routes: Routes = [
  {
    path: '',
    component: BusiStatisticComponent,
    children: []
  }
];

export const routing = RouterModule.forChild(routes);
