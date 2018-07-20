import { Routes, RouterModule }  from '@angular/router';
import { SpreadStatisticComponent } from "./spread-statistic.component";

const routes: Routes = [
  {
    path: '',
    component: SpreadStatisticComponent,
    children: []
  }
];

export const routing = RouterModule.forChild(routes);
