import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {NgaModule} from "../../../../theme/nga.module";
import {SaleOrderService} from "./modules/sale-order/sale-order.service";
import {BaseService} from "../../../base.service";
import {SalesManageComponent} from "./sales-manage.component";
import SaleOrderModule from "./modules/sale-order/sale-order.module";
import {sharedModule} from "../../../common/shared.module";
import SaleReturnModule from "./modules/sale-return/sale-return.module";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    sharedModule,
    NgaModule,
    SaleOrderModule,
    SaleReturnModule
  ],
  declarations: [
    SalesManageComponent,
  ],
  providers: [
    SaleOrderService,
    BaseService
  ]
})
export default class SalesManageModule {
}
