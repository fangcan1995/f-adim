import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {NgaModule} from "../../../../theme/nga.module";
import {BaseService} from "../../../base.service";
import {sharedModule} from "../../../common/shared.module";
import {AccountCheckingManageComponent} from "./account-checking-manage.component";
import {BrandManageService} from "../../../basic_info/modules/brand-manage/brand-manage.service";
import {SupplierManageService} from "../../../basic_info/modules/supplier-manage/supplier-manage.service";
import {PurchaseOrderService} from "../purchase-manage/modules/purchase-order/purchase-order.service";
import {contractService} from "../../../basic_info/modules/contract-manage/contrat-manage.service";
import {SaleAccountService} from "./modules/sale-account/sale-account.service";
import SaleAccountModule from "./modules/sale-account/sale-account.module";
import {SaleOrderService} from "../sales-manage/modules/sale-order/sale-order.service";
import PurchaseContractAccountModule from "./modules/purchase-contract-account/purchase-contract-account.module";
import {PurchaseContractAccountService} from "./modules/purchase-contract-account/purchase-contract-account.service";
import SaleContractAccountModule from "./modules/sale-contract-account/sale-contract-account.module";
import {SaleContractAccountService} from "./modules/sale-contract-account/sale-contract-account.service";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    sharedModule,
    NgaModule,
    PurchaseContractAccountModule,
    SaleContractAccountModule,
    SaleAccountModule
  ],
  declarations: [
    AccountCheckingManageComponent,
  ],
  providers: [
    BaseService,
    contractService,
    BrandManageService,
    SupplierManageService,
    SaleOrderService,
    PurchaseOrderService,
    SaleAccountService,
    PurchaseContractAccountService,
    SaleContractAccountService
  ]
})
export default class AccountCheckingManageModule {
}
