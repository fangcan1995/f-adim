import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MemberComponent } from './member.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component'
import {MemberDetailComponent} from "./components/member-detail/member-detail.component"
import {MemberInfoComponent} from "./components/member-detail/memberInfo/memberInfo.component"
import {InvestsInfoComponent} from "./components/member-detail/investsInfo/investsInfo.component"
import {LoansInfoComponent} from "./components/member-detail/loansInfo/loansInfo.component"
import {TradesInfoComponent} from "./components/member-detail/tradesInfo/tradesInfo.component"
const routes: Routes = [
  {
    path: '',
    children: [
    	{
    		path: '',
    		component: MemberComponent,
    	},
    	/*{
    		path: 'add',
    		component: MemberEditComponent,
    	},*/
    	{
    		path: 'edit/:id',
    		component: MemberEditComponent,
    	},
      {
        path: 'detail/:id',
        component: MemberDetailComponent,
      },
      {
        path: 'invests/:id',
        component: InvestsInfoComponent,
      },
      {
        path: 'loans/:id',
        component: LoansInfoComponent,
      },
      {
        path: 'trades/:id',
        component: TradesInfoComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
