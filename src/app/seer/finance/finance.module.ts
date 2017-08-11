import { NgModule }      from '@angular/core';

import { FinanceComponent } from './finance.component';
import {Routes, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      {path:'accounts-payable', loadChildren: './modules/accounts-payable/accounts-payable.module'},
      {path:'accounts-receivable', loadChildren: './modules/accounts-receivable/accounts-receivable.module'},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FinanceComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class FinanceModule {
}
