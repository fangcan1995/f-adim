import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {SupplierManageRouting} from "./supplier-manage.routing";
import {SupplierManageComponent} from "./supplier-manage.component";
import {SupplierHomeComponent} from "./component/supplier-home/supplier-home.component";
import {SupplierOprationComponent} from "./component/supplier-opration/supplier-opration.component";
import {SupplierListComponent} from "./component/supplier-list/supplier-list.component";
import {SupplierAddComponent} from "./component/supplier-add/supplier-add.component";
import {SupplierEditComponent} from "./component/supplier-edit/supplier-edit.component";
import {SupplierManageService} from "./supplier-manage.service";
import {BaseService} from "../../../base.service";

/**
 * Created by Administrator on 2016/12/26.
 */
@NgModule({
  imports: [
    sharedModule,
    NgaModule,
    FormsModule,
    CommonModule,
    SupplierManageRouting
  ],
  declarations: [
    SupplierManageComponent,
    SupplierHomeComponent,
    SupplierOprationComponent,
    SupplierListComponent,
    SupplierAddComponent,
    SupplierEditComponent
  ],
  providers: [
    SupplierManageService,
    BaseService
  ]
})
export class SupplierManageModule {
}
