import { NgModule }      from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {PurchaseOrderComponent} from "./purchase-order.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {PurchaseOrderHomeComponent} from "./components/home/purchase-order-home.component";
import {PurchaseOrderEditComponent} from "./components/edit/purchase-order-edit.component";
import {PurchaseOrderListComponent} from "./components/list/purchase-order-list.component";
import {PurchaseOrderOperationComponent} from "./components/operation/purchase-order-operation.component";
import {PurchaseOrderCensorComponent} from "./components/censor/purchase-order-censor.component";
import {PurchaseOrderDetailComponent} from "./components/detail/purchase-order-detail.component";
import {PrintComponent} from "./components/print/print.component";

const routes: Routes = [
  {
    path: 'purchase-order-manage',
    component: PurchaseOrderComponent,
    children: [
      {path:'', component:PurchaseOrderHomeComponent},
      {path:'order', component:PurchaseOrderEditComponent},
      {path:'order/:orderId', component:PurchaseOrderEditComponent},
      {path:'order/:orderId/:taskId', component:PurchaseOrderEditComponent},
      {path:'censor/:orderId/:taskId', component:PurchaseOrderCensorComponent},
      {path:'order-detail/:orderId', component:PurchaseOrderDetailComponent},
      {path:'order-detail/:orderId/:taskId', component:PurchaseOrderDetailComponent},
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
    PurchaseOrderComponent,
    PurchaseOrderHomeComponent,
    PurchaseOrderEditComponent,
    PurchaseOrderListComponent,
    PurchaseOrderOperationComponent,
    PurchaseOrderCensorComponent,
    PurchaseOrderDetailComponent,
    PrintComponent
  ],
})
export default class PurchaseOrderModule {
}
