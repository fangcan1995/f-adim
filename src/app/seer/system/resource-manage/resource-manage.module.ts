import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { sharedModule } from "../../common/shared.module";
import { resourceManageRouting } from "./resource-manage.routing";
import { ResourceManageService } from "./resource-manage.service";
import { ResourceHomeComponent } from "./components/resource-home/resource-home.component";
import { ResourceListComponent } from "./components/resource-list/resource-list.component";
import { ResourceOperationComponent } from "./components/resource-opration/resource-operation.component";
import { ResourceManageComponent } from "./resource-manage.component";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ResourceEditComponent } from "./components/resource-edit/resource-edit.component";


import { ReourceBaseService } from "./base.service";



@NgModule({
  imports: [
    Ng2SmartTableModule,
    NgaModule,
    resourceManageRouting,
    sharedModule
  ],
  declarations: [
    ResourceManageComponent,
    ResourceHomeComponent,
    ResourceListComponent,
    ResourceOperationComponent,
    ResourceEditComponent
  ],
  providers: [
    ResourceManageService,
    ReourceBaseService
  ]
})
export default class ResourceManageModule {
}
