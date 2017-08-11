import { NgModule }      from '@angular/core';
import {RouterModule} from "@angular/router";
import {NgaModule} from "../../../../theme/nga.module";
import {PurchaseManageComponent} from "./purchase-manage.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../common/shared.module";
import {PurchaseOrderService} from "./modules/purchase-order/purchase-order.service";
import RefundPurchaseModule from "./modules/refund-purchase/refund-purchase.module";
import PreOrderModule from "./modules/pre-order/pre-order.module";
import PurchaseOrderModule from "./modules/purchase-order/purchase-order.module";
import {TemplateManageService} from "../../../sys/modules/template-manage/template-manage.service";


const SERVICES = [
  PurchaseOrderService,
  TemplateManageService
];

const SUB_MODULES = [
  RefundPurchaseModule,
  PreOrderModule,
  PurchaseOrderModule,
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ...SUB_MODULES,
    sharedModule,
    NgaModule,
  ],
  declarations: [
    PurchaseManageComponent,
  ],
  providers:[...SERVICES]
})
export default class PurchaseManageModule {
}
