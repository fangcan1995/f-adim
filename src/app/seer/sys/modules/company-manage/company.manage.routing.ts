import { Routes, RouterModule }  from '@angular/router';
import {CompanyManageComponent} from "./company.manage.component";
import {companyHomeManageComponent} from "./components/home/company.home.component";






// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CompanyManageComponent,
    children: [
      { path: '', component: companyHomeManageComponent},
    ]
  }
];

export const companyManageRouting = RouterModule.forChild(routes);

