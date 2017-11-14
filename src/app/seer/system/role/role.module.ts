import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./role.routing";
import { RoleService } from "./role.service";
import { ResourceService } from '../resource/resource.service';

import { RoleComponent } from "./role.component";
import { RoleEditComponent } from "./components/role-edit/role-edit.component";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    RoleComponent,
    RoleEditComponent,
  ],
  providers: [
    RoleService,
    ResourceService
  ]
})
export class RoleModule {
}
