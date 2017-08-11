import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {PurchaseContractAccountComponent} from "./purchase-contract-account.component";
import {PurchaseContractAccountHomeComponent} from "./components/home/purchase-contract-account-home.component";
import {PurchaseContractAccountAddComponent} from "./components/add/purchase-contract-account-add.component";
import {PurchaseContractAccountOperationComponent} from "./components/operation/purchase-contract-account-operation.component";
import {PurchaseContractAccountListComponent} from "./components/list/purchase-contract-account-list.component";
/**
 * Created by Administrator on 2017/1/13.
 */
const routes: Routes = [
  {
    path: 'purchase-contract-account',
    component: PurchaseContractAccountComponent,
    children: [
      {path:'', component:PurchaseContractAccountHomeComponent},
      {path:'add', component:PurchaseContractAccountAddComponent},
      {path:'add/:id', component:PurchaseContractAccountAddComponent},
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
    PurchaseContractAccountComponent,
    PurchaseContractAccountHomeComponent,
    PurchaseContractAccountAddComponent,
    PurchaseContractAccountListComponent,
    PurchaseContractAccountOperationComponent
  ],
})
export default class PurchaseContractAccountModule {
}
