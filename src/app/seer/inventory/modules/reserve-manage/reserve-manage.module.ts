import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {FormsModule as AngularFormsModule, FormsModule} from '@angular/forms';

import {Routes, RouterModule} from "@angular/router";
import {NgaModule} from "../../../../theme/nga.module";
import {ReserveManageComponent} from "./reserve-manage.component";
import {StorageManageComponent} from "./modules/storage-manage/storage-manage.component";
import {GoodsListStorageComponent} from "./modules/storage-manage/components/goodsListStorage/goods.list.storage.component";
import {RepertoryCheckComponent} from "./modules/repertory-check/repertory-check.component";
import {RepertoryComponent} from "./modules/repertory-check/components/repertory.component";
import {RepertoryCheckService} from "./modules/repertory-check/repertory-check.service";
import {sharedModule} from "../../../common/shared.module";
import {GoodDetailsDialogComponent} from "./modules/repertory-check/components/good-details/goods-detail.component";
import {AllocationGoodsDialogComponent} from "./modules/warehouse-allocation-manage/components/good-details/allocation-goods.component";
import {AllocationRepertoryComponent} from "./modules/warehouse-allocation-manage/components/allocation.repertory.component";
import {MoveRepertoryComponent} from "./modules/warehouse-allocation-manage/components/move-repertory/move-repertory.component";
import {AllocationRepertoryCheckComponent} from "./modules/warehouse-allocation-manage/allocation-repertory-check.component";
import {AllocationRepertoryCheckService} from "./modules/warehouse-allocation-manage/allocation-repertory-check.service";
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {InExStorageListComponent} from "./modules/storage-manage/components/storageList/storage.list";
import {InExStorageListEditComponent} from "./modules/storage-manage/components/storageListEdit/storage.list.edit";
import {InStorageService} from "./modules/storage-manage/in-storage-manage.service";
import {ExStorageService} from "./modules/storage-manage/ex-storage-manage.service";
import {OutBoundStorageManageComponent} from "./modules/storage-manage/out-bound-storage-manage.component";
import {StoragesListComponent} from "./modules/repertory-check/components/storageList/storage-list.component";
import {RepertoryListTableService} from "./modules/repertory-list/repertory-list-table.service";
import {RepertoryListTableComponent} from "./modules/repertory-list/repertory-list-table.component";
import {ListGoodDetailsDialogComponent} from "./modules/repertory-list/components/good-details/list-goods-detail.component";
import {StorageRepertoryListComponent} from "./modules/repertory-list/components/storageList/storage-repertory-list.component";
import {RepertoryListComponent} from "./modules/repertory-list/components/repertory-list.component";
import {GoodsDetailComponent} from "./modules/goods-detail/goods-detail.component";
import {GoodsDetailService} from "./modules/goods-detail/goods-detail.service";


const routes: Routes = [
  {
    path: '',
    component: ReserveManageComponent,
    children: [
      { path: '', redirectTo: 'inbound-order'},
      { path: 'repertory-check', component: RepertoryCheckComponent},
      { path: 'inbound-order', component: StorageManageComponent},
      { path: 'outbound-order', component: OutBoundStorageManageComponent},
      { path: 'warehouse-allocation-manage', component: AllocationRepertoryCheckComponent},
      { path: 'repertory-list', component: RepertoryListTableComponent},
      { path: 'goods-detail', component: GoodsDetailComponent},
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    sharedModule,
    MultiselectDropdownModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReserveManageComponent,
    RepertoryCheckComponent,
    RepertoryComponent,
    StorageManageComponent,
/*    GoodsListStorageComponent,*/
    GoodDetailsDialogComponent,
    AllocationGoodsDialogComponent,
    AllocationRepertoryComponent,
    MoveRepertoryComponent,
    AllocationRepertoryCheckComponent,
 /*   InExStorageListComponent,
    InExStorageListEditComponent,*/
    OutBoundStorageManageComponent,
    StoragesListComponent,
    RepertoryListTableComponent,
    StorageRepertoryListComponent,
    ListGoodDetailsDialogComponent,
    RepertoryListComponent,
    GoodsDetailComponent,
  ],
  providers:[
    RepertoryCheckService,
    AllocationRepertoryCheckService,
    InStorageService,
    ExStorageService,
    RepertoryListTableService,
    GoodsDetailService,
  ],
})
export default class ReserveManageModule {
}
