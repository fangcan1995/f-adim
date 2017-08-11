import { NgModule }      from '@angular/core';

import {Routes, RouterModule} from "@angular/router";
import {RefundPurchaseComponent} from "./refund-purchase.component";
import {RefundPurchaseHomeComponent} from "./components/home/refund-purchase-home.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {RefundPurchaseOrderEditComponent} from "./components/edit/refund-purchase-order-edit.component";
import {RefundPurchaseOrderListComponent} from "./components/list/refund-purchase-order-list.component";
import {RefundPurchaseOrderOperationComponent} from "./components/operation/refund-purchase-order-operation.component";
import {PurchaseOrderDetailComponent} from "../purchase-order/components/detail/purchase-order-detail.component";
import {RefundPurchaseOrderDetailComponent} from "./components/detail/refund-purchase-order-detail.component";
import {RefundPurchaseOrderCensorComponent} from "./components/censor/refund-purchase-order-censor.component";

const routes: Routes = [
  {
    path: 'refund-purchase-order-manage',
    component: RefundPurchaseComponent,
    children: [
      {path:'', component:RefundPurchaseHomeComponent},
      {path:'order', component:RefundPurchaseOrderEditComponent},
      {path:'order/:orderId', component:RefundPurchaseOrderEditComponent},
      {path:'order/:orderId/:taskId', component:RefundPurchaseOrderEditComponent},
      {path:'censor/:orderId/:taskId', component:RefundPurchaseOrderCensorComponent},
      {path:'order-detail/:orderId', component:RefundPurchaseOrderDetailComponent},
      {path:'order-detail/:orderId/:taskId', component:RefundPurchaseOrderDetailComponent},
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
    RefundPurchaseComponent,
    RefundPurchaseHomeComponent,
    RefundPurchaseOrderEditComponent,
    RefundPurchaseOrderListComponent,
    RefundPurchaseOrderOperationComponent,
    RefundPurchaseOrderDetailComponent,
    RefundPurchaseOrderCensorComponent
  ],
})
export default class RefundPurchaseModule {
}
