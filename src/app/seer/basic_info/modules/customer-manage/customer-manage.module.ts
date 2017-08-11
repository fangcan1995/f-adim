import {NgModule} from "@angular/core";

import {Ng2SmartTableModule} from "ng2-smart-table";
import {NgaModule} from "../../../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {sharedModule} from "../../../common/shared.module";
import {CustomerEditComponent} from "./components/customer-edit/customer-edit.component";
import {CustomerOperationComponent} from "./components/customer-opration/customer-operation.component";
import {CustomerListComponent} from "./components/customer-list/customer-list.component";
import {CustomerHomeComponent} from "./components/customer-home/customer-home.component";
import {CustomerManageComponent} from "./customer-manage.component";
import {customerManageRouting} from "./customer-manage.routing";
import {CustomerManageService} from "./customer-manage.service";
import {BaseService} from "../../../base.service";
import {CustomerStoreAddedDialogComponent} from "./components/customer-store-dialog/customerstore-added-dialog.component";
import {SaleManListBComponent} from "./components/saleman/saleman-list.component";







@NgModule({
  imports: [
    Ng2SmartTableModule,
    NgaModule,
    FormsModule,
    customerManageRouting,
    sharedModule
  ],
  declarations: [
    CustomerManageComponent,
    CustomerHomeComponent,
    CustomerListComponent,
    CustomerOperationComponent,
    CustomerEditComponent,
    CustomerStoreAddedDialogComponent,
    SaleManListBComponent,
  ],
  providers: [
    CustomerManageService,
    BaseService

  ]
})
export default class CustomerManageModule {
}
