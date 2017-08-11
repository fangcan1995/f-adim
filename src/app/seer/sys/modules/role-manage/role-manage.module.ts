import {NgModule} from "@angular/core";
import {roleManageRouting} from "./role-manage.routing";
import {RoleManageService} from "./role-manage.service";
import {RoleHomeComponent} from "./components/role-home/role-home.component";
import {RoleListComponent} from "./components/role-list/role-list.component";
import {RoleManageComponent} from "./role-manage.component";
// import {Ng2SmartTableModule} from "ng2-smart-table";
import {NgaModule} from "../../../../theme/nga.module";
import {BaseService} from "../../../base.service";
import {RoleEditComponent} from "./components/role-edit/role-edit.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {sharedModule} from "../../../common/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NgaModule,
    roleManageRouting,
    sharedModule
  ],
  declarations: [
    RoleManageComponent,
    RoleHomeComponent,
    RoleListComponent,
    RoleEditComponent,
  ],
  providers: [
    RoleManageService,
    BaseService
  ]
})
export class RoleManageModule {
}
