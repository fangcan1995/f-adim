import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from '../../common/shared.module';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './staff.routing';
import { StaffService } from './staff.service';
import {BaseService} from "../../base.service"

import { StaffComponent } from './staff.component';
import { StaffEditComponent } from './components/staff-edit/staff-edit.component';
import {StaffAddComponent} from "./components/staff-add/staff-add.component"
import { OrgListComponent } from './components/orgList/org-list.component';
import {OrgTreeDialogComponent} from "../org-manage/components/tree/org-tree.component"
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    TabsModule,
    routing,
  ],
  declarations: [
    StaffComponent,
    StaffEditComponent,
    StaffAddComponent,
    OrgListComponent,
    OrgTreeDialogComponent,
  ],
  providers: [
    BaseService,
    StaffService
  ]
})
export  class StaffModule {
}
