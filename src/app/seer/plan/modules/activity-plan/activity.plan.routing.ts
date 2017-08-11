import { Routes, RouterModule }  from '@angular/router';


import {ActivityPlanComponent} from "./activity.plan.component";
import {ActivityListComponent} from "./components/activityList/activity.list.component";



const routes: Routes = [
  {
    path: '',
    component: ActivityPlanComponent,
    children: [
      { path: '', component: ActivityListComponent},
    ]
  }
];

export const ActivityPlanRouting = RouterModule.forChild(routes);

