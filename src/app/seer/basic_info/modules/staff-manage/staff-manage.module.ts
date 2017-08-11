import {NgModule} from "@angular/core";
import {staffManageRouting} from "./staff-manage.routing";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';




import {sharedModule} from "../../../common/shared.module";
import {StaffComponent} from "./components/staff.component";
import {StaffManageService} from "./staff-manage.service";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import {StaffManageComponent} from "./staff-manage.component";
import {NgaModule} from "../../../../theme/nga.module";
import {OrgListComponent} from "./components/orgList/org-list.component";
import {TargetManageService} from "../target-manage/target-manage.service";


@NgModule({
  imports: [
    NgaModule,
    staffManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    StaffComponent,
    StaffManageComponent,
    OrgListComponent,
  ],
  providers: [
    StaffManageService,
    TargetManageService
  ]
})
export default class StaffManageModule {
}
