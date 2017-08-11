import { Routes, RouterModule }  from '@angular/router';
import {CarManageComponent} from "./car-manage.component";
import {carComponent} from "./components/car.component";





// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CarManageComponent,
    children: [
      { path: '', component: carComponent},
    ]
  }
];

export const carManageRouting = RouterModule.forChild(routes);
