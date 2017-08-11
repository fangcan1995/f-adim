import {NgModule} from "@angular/core";
import {NgaModule} from "../../../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../common/shared.module";
import {Routes, RouterModule} from "@angular/router";
import {AccountsReceivableComponent} from "./accounts-receivable.component";
import {AccountsReceivableHomeComponent} from "./components/home/accounts-receivable-home.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsReceivableComponent,
    children: [
      {path:'', component:AccountsReceivableHomeComponent},
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
    AccountsReceivableComponent,
    AccountsReceivableHomeComponent
  ],
  providers: [
  ]
})
export default class AccountsReceivableModule {
}
