import { NgModule } from "@angular/core";

import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";

import { routing } from "./org.routing";
import { OrgComponent } from "./org.component";
import {OrgTreeDialogComponent} from "./components/tree/org-tree.component";
import { OrgService } from "./org.service";

import {Ng2SmartTableModule} from "ng2-smart-table";

import { TimepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    Ng2SmartTableModule,
    TimepickerModule.forRoot()
  ],
  declarations: [
    OrgComponent,
    OrgTreeDialogComponent
  ],
  providers: [
    OrgService
  ]
})
export class OrgModule {
}

