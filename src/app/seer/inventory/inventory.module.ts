import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import {Routes, RouterModule} from "@angular/router";
import {InventoryComponent} from "./inventory.component";
import {ShippingListManageService} from "./modules/delivery-manage/modules/shippinglist-manage/component/shippinglist-manage.service";
import {BaseService} from "../base.service";

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: '', redirectTo: 'reserve-manage'},
      { path: 'reserve-manage', loadChildren:'./modules/reserve-manage/reserve-manage.module' },
      { path: 'purchase-manage', loadChildren:'./modules/purchase-manage/purchase-manage.module' },
      { path: 'delivery-manage', loadChildren:'./modules/delivery-manage/delivery-manage.module' },
      { path: 'sales-manage', loadChildren: './modules/sales-manage/sales-manage.module' },
      { path: 'account-checking-manage', loadChildren: './modules/account-checking-manage/account-checking-manage.module' },
      // { path: 'statement-manage', loadChildren: './modules/statement-manage/statement-manage.module' }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InventoryComponent,
  ],

  providers: [
    ShippingListManageService,
    BaseService
  ]
})
export class InventoryModule {
}
