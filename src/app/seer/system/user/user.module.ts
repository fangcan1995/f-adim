import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./user.routing";
import { UserService } from "./user.service";
import { UserComponent } from "./user.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { RoleService } from "../role/role.service";
import { ResourceService } from '../resource/resource.service';
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
  ],
  providers: [
    UserService,
    RoleService,
    ResourceService,
  ]
})
export class UserModule {
}
