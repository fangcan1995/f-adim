import { NgModule } from "@angular/core";
import { sharedModule } from "../../common/shared.module";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { staffManageRouting } from "./staff.routing";

import { StaffComponent } from "./components/staff.component";
import { StaffManageService } from "./staff.service";
import { StaffManageComponent } from "./staff.component";
import { NgaModule } from "../../../theme/nga.module";
import { OrgListComponent } from "./components/orgList/org-list.component";


@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    TabsModule,
    staffManageRouting,
  ],
  declarations: [
    StaffComponent,
    StaffManageComponent,
    OrgListComponent,
  ],
  providers: [
    StaffManageService
  ]
})
export class StaffModule {
}
