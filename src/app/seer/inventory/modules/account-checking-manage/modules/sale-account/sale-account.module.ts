import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {SaleAccountComponent} from "./sale-account.component";
import {SaleAccountAddComponent} from "./components/add/sale-account-add.component";
import {SaleAccountHomeComponent} from "./components/home/sale-account-home.component";
import {SaleAccountListComponent} from "./components/list/sale-account-list.component";
import {SaleAccountOperationComponent} from "./components/operation/sale-account-operation.component";
/**
 * Created by Administrator on 2017/2/20.
 */
const routes: Routes = [
  {
    path: 'sale-account',
    component: SaleAccountComponent,
    children: [
      {path:'', component:SaleAccountHomeComponent},
      {path:'add', component:SaleAccountAddComponent},
      {path:'add/:id', component:SaleAccountAddComponent},
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
    SaleAccountComponent,
    SaleAccountHomeComponent,
    SaleAccountAddComponent,
    SaleAccountListComponent,
    SaleAccountOperationComponent
  ],
})
export default class SaleAccountModule {
}
