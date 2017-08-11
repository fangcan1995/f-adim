import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {FormsModule as AngularFormsModule, FormsModule} from '@angular/forms';

import {Routes, RouterModule} from "@angular/router";
import {NgaModule} from "../../../../theme/nga.module";
import {DeliveryManageComponent} from "./delivery-manage.component";
import {VehicleManageComponent} from "./modules/vehicle-manage/vehicle-manage.component";
import {VehicleListManageComponent} from "./modules/vehicle-manage/components/list/vehicle.list.component";
import {ShippingListHomeComponent} from "./modules/shippinglist-manage/component/shippinglist-home/shippinglist-home.component";
import {ShippingListComponent} from "./modules/shippinglist-manage/component/shippinglist-list/shippinglist-list.component";
import {ShippingListOperationComponent} from "./modules/shippinglist-manage/component/shippinglist-opration/shippinglist-operation.component";
import {sharedModule} from "../../../common/shared.module";
import {SaleManListComponent} from "./modules/shippinglist-manage/component/saleman/saleman-list.component";
import {CustomerStoreDialogComponent} from "./modules/shippinglist-manage/component/customer-store-dialog/customerstore-added-dialog.component";
import {CustomerDialogComponent} from "./modules/shippinglist-manage/component/customer-dialog/customer-dialog.component";
import {CustomerManageService} from "../../../basic_info/modules/customer-manage/customer-manage.service";


const routes: Routes = [
  {
    path: '',
    component: DeliveryManageComponent,
    children: [
      { path: '', redirectTo: 'vehicle-appointment'},
      { path: 'vehicle-appointment', component: VehicleManageComponent},
      { path: 'shipping-list', component: ShippingListHomeComponent},
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFormsModule,
    NgaModule,
    RouterModule.forChild(routes),
    sharedModule
  ],
  declarations: [
    DeliveryManageComponent,
    VehicleManageComponent,
    VehicleListManageComponent,
    ShippingListHomeComponent,
    ShippingListComponent,
    ShippingListOperationComponent,
    CustomerStoreDialogComponent,
    CustomerDialogComponent,
  ],
  providers: [CustomerManageService],

})
export default class InventoryModule {
}
