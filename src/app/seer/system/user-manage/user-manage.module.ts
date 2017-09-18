import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { userManageRouting } from "./user-manage.routing";
import { UserManageService } from "./user-manage.service";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserOperationComponent } from "./components/user-opration/user-operation.component";
import { UserManageComponent } from "./user-manage.component";
import { UserAddedDialogComponent } from "./components/user-added-dialog/user-added-dialog.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { BaseService } from "../../base.service";
import { RoleService } from "../role/role.service";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    userManageRouting
  ],
  declarations: [
    UserManageComponent,
    UserHomeComponent,
    UserListComponent,
    UserOperationComponent,
    UserEditComponent,
    UserAddedDialogComponent,
  ],
  providers: [
    UserManageService,
    RoleService,
    BaseService
  ]
})
export class UserManageModule {
}
