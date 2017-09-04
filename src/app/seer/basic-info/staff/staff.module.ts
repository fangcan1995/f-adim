import { NgModule } from "@angular/core";
import { sharedModule } from "../../common/shared.module";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from "./staff.routing";

import { StaffComponent } from "./staff.component";
import { StaffService } from "./staff.service";
import { NgaModule } from "../../../theme/nga.module";
import { OrgListComponent } from "./components/orgList/org-list.component";


@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    TabsModule,
    routing,
  ],
  declarations: [
    StaffComponent,
    OrgListComponent,
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule {
}
