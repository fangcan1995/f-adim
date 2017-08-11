import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {userManageRouting} from "./user-manage.routing";
import {UserManageService} from "./user-manage.service";
import {UserHomeComponent} from "./components/user-home/user-home.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserOperationComponent} from "./components/user-opration/user-operation.component";
import {UserManageComponent} from "./user-manage.component";
import {UserAddedDialogComponent} from "./components/user-added-dialog/user-added-dialog.component";
import {NgaModule} from "../../../../theme/nga.module";
import {BaseService} from "../../../base.service";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {RoleManageService} from "../role-manage/role-manage.service";
import {sharedModule} from "../../../common/shared.module";
import {SaleManListBComponent} from "../../../basic_info/modules/customer-manage/components/saleman/saleman-list.component";

@NgModule({
  imports: [
    sharedModule,
    NgaModule,
    FormsModule,
    CommonModule,
    userManageRouting
  ],
  declarations: [
    UserManageComponent,
    UserHomeComponent,
    UserListComponent,
    UserOperationComponent,
    UserEditComponent,
    UserAddedDialogComponent,
    SaleManListBComponent
  ],
  providers: [
    UserManageService,
    RoleManageService,
    BaseService
  ]
})
export class UserManageModule {
}
