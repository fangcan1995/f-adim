import {SaleReturnComponent} from "./sale-return.component";
import {SaleReturnHomeComponent} from "./components/home/sale-return-home.component";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SaleReturnAddComponent} from "./components/add/sale-return-add.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {SaleReturnOperationComponent} from "./components/operation/sale-return-operation.component";
import {SaleReturnListComponent} from "./components/list/sale-return-list.component";
import {CustomerManageService} from "../../../../../basic_info/modules/customer-manage/customer-manage.service";
import {BrandManageService} from "../../../../../basic_info/modules/brand-manage/brand-manage.service";
/**
 * Created by Administrator on 2017/1/22.
 */
const routes: Routes = [
  {
    path: 'refund-sales-order-manage',
    component: SaleReturnComponent,
    children: [
      {path:'', component:SaleReturnHomeComponent},
      {path:'add', component:SaleReturnAddComponent},
      {path:'add/:id', component:SaleReturnAddComponent},
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
    SaleReturnComponent,
    SaleReturnHomeComponent,
    SaleReturnOperationComponent,
    SaleReturnListComponent,
    SaleReturnAddComponent
  ],
  providers: [
    CustomerManageService,
    BrandManageService
  ]
})
export default class SaleReturnModule {
}
