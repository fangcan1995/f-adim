import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SaleOrderComponent} from "./sale-order.component";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {SaleOrderHomeComponent} from "./components/home/sale-order-home.component";
import {SaleOrderOperationComponent} from "./components/operation/sale-order-operation.component";
import {SaleOrderListComponent} from "./components/list/sale-order-list.component";
import {SaleOrderAddComponent} from "./components/add/sale-order-add.component";
/**
 * Created by Administrator on 2017/1/13.
 */
const routes: Routes = [
  {
    path: 'sales-order-manage',
    component: SaleOrderComponent,
    children: [
      {path:'', component:SaleOrderHomeComponent},
      {path:'add', component:SaleOrderAddComponent},
      {path:'add/:id', component:SaleOrderAddComponent},
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
    SaleOrderComponent,
    SaleOrderHomeComponent,
    SaleOrderOperationComponent,
    SaleOrderListComponent,
    SaleOrderAddComponent
  ],
})
export default class SaleOrderModule {
}
