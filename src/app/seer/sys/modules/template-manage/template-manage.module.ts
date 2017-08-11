import {NgModule} from "@angular/core";
import {PrintManageRouting} from "./template-manage.routing";

import {NgaModule} from "../../../../theme/nga.module";
import {BaseService} from "../../../base.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {sharedModule} from "../../../common/shared.module";
import {TemplateManageComponent} from "./template-manage.component";
import {TemplateManageService} from "./template-manage.service";
import {TemplateListComponent} from "./components/template-list/template-list.component";
import {EditTemplateComponent} from "./components/edit-template/edit-template.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NgaModule,
    PrintManageRouting,
    sharedModule
  ],
  declarations: [
    TemplateManageComponent,
    TemplateListComponent,
    EditTemplateComponent
  ],
  providers: [
    TemplateManageService,
    BaseService
  ]
})
export class TemplateManageModule {
}
