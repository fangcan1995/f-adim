import {NgModule} from "@angular/core";
import {NgaModule} from "../../../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {sharedModule} from "../../../common/shared.module";
import {Routes, RouterModule} from "@angular/router";
import {AccountsPayableComponent} from "./accounts-payable.component";
import {AccountsPayableHomeComponent} from "./components/home/accounts-payable-home.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsPayableComponent,
    children: [
      {path:'', component:AccountsPayableHomeComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    RouterModule.forChild(routes),
    sharedModule
  ],
  declarations: [
    AccountsPayableComponent,
    AccountsPayableHomeComponent
  ],
  providers: [
  ]
})
export default class AccountsPayableModule {
}
