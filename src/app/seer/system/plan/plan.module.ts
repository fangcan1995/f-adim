import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./plan.routing";
import { PlanService } from "./plan.service";
import { UserComponent } from "./plan.component";
import { UserEditComponent } from "./components/plan-edit/plan-edit.component";
import { RoleService } from "../role/role.service";
import { ResourceService } from '../resource/resource.service';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    CustomFormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
  ],
  providers: [
    PlanService,
    RoleService,
    ResourceService,
  ]
})
export class PlanModule {
}
