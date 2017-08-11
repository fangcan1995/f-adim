import { Routes, RouterModule }  from '@angular/router';


import {NgModule} from "@angular/core";
import {BasicInfoComponent} from "./basic_info.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BasicInfoComponent,
    children: [
      { path: '', redirectTo: 'contrat-manage'},
      { path: 'car-manage', loadChildren:'./modules/car-manage/car-manage.module' },
      { path: 'contrat-manage', loadChildren:'./modules/contract-manage/contrat-manage.module' },
      { path: 'brand-manage', loadChildren:'./modules/brand-manage/brand-manage.module'},
      { path: 'staff-manage', loadChildren:'./modules/staff-manage/staff-manage.module' },
      { path: 'target-manage', loadChildren:'./modules/target-manage/target-manage.module' },
      { path: 'supplier-manage', loadChildren:'./modules/supplier-manage/supplier-manage.module#SupplierManageModule' },
      { path: 'storage-manage', loadChildren:'./modules/storage-manage/storage-manage.module' },
      { path: 'goods-manage', loadChildren:'./modules/goods-manage/goods-manage.module#GoodsManageModule' },
      { path: 'org-manage', loadChildren:'./modules/org-manage/org-manage.module' },
      { path: 'customer-manage', loadChildren:'./modules/customer-manage/customer-manage.module' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class basicInfoRouting{

}
