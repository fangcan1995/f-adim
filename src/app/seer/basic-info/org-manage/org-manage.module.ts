import {NgModule} from "@angular/core";

import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../theme/nga.module";

import {SharedModule} from "../../common/shared.module";

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import {orgManageRouting} from "./org-manage.routing";
import {OrgManageComponent} from "./org-manage.component";

import {OrgManageService} from "./org-manage.service";
import {BaseService} from "../../base.service";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {OrgTreeDialogComponent} from "./components/tree/org-tree.component";

@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TabsModule,
    orgManageRouting,
    Ng2SmartTableModule,
  ],
  declarations: [
    OrgManageComponent,
    OrgTreeDialogComponent

  ],
  providers: [
    BaseService,
    OrgManageService
  ]
})
export default class OrgManageModule {
}

