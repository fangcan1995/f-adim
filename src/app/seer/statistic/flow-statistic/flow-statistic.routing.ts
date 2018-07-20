import { Routes, RouterModule }  from '@angular/router';
import { FlowStatisticComponent } from "./flow-statistic.component";

const routes: Routes = [
  {
    path: '',
    component: FlowStatisticComponent,
    children: []
  }
];

export const routing = RouterModule.forChild(routes);
