import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from "./org.routing";
import { OrgComponent } from "./org.component";
import {OrgTreeDialogComponent} from "./components/tree/org-tree.component";
import { OrgService } from "./org.service";

import {BaseService} from "../../base.service";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    TabsModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    OrgComponent,
    OrgTreeDialogComponent

  ],
  providers: [
    BaseService,
    OrgService
  ]
})
export class OrgModule {
}

