import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {LoanBasicComponent} from "./loan-basic.component";
import {MemberInfoComponent} from "./component/member-info/member-info.component";


const routes: Routes = [
  {
    path: '',
    children: [
    	{path: '', component: LoanBasicComponent},
      {path: 'memberInfo', component: MemberInfoComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
