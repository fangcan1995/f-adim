import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./plan.routing";
import { UserService } from "./plan.service";
import { UserComponent } from "./plan.component";
import { UserEditComponent } from "./components/plan-edit/plan-edit.component";
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
export class PlanModule {
}
