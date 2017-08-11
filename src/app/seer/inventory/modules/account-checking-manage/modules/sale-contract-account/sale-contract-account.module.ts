import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {SaleContractAccountComponent} from "./sale-contract-account.component";
import {SaleContractAccountHomeComponent} from "./components/home/sale-contract-account-home.component";
import {SaleContractAccountAddComponent} from "./components/add/sale-contract-account-add.component";
import {SaleContractAccountListComponent} from "./components/list/sale-contract-account-list.component";
import {SaleContractAccountOperationComponent} from "./components/operation/sale-contract-account-operation.component";
/**
 * Created by Administrator on 2017/3/1.
 */
const routes: Routes = [
  {
    path: 'sale-contract-account',
    component: SaleContractAccountComponent,
    children: [
      {path:'', component:SaleContractAccountHomeComponent},
      {path:'add', component:SaleContractAccountAddComponent},
      {path:'add/:id', component:SaleContractAccountAddComponent},
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    sharedModule,
    NgaModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SaleContractAccountComponent,
    SaleContractAccountHomeComponent,
    SaleContractAccountAddComponent,
    SaleContractAccountListComponent,
    SaleContractAccountOperationComponent
  ],
})
export default class SaleContractAccountModule {
}
