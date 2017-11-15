import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";
import {routing} from "./personal-info.routing";
import {PersonalInfoComponent} from "./personal-info.component";
import {PersonalInfoService} from "./personal-info.service";
import {StaffService} from "../staff/staff.service";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    PersonalInfoComponent
  ],
  providers: [
    PersonalInfoService,
    StaffService
  ],
})
export class PersonalInfoModule {
}
