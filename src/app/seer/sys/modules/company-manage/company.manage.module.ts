import {NgModule} from "@angular/core";

import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';




import {DatepickerModule, TabsModule} from 'ng2-bootstrap';
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {CompanyManageComponent} from "./company.manage.component";
import {companyManageRouting} from "./company.manage.routing";
import {companyService} from "./company.manage.service";
import {companyHomeManageComponent} from "./components/home/company.home.component";

@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    companyManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    CompanyManageComponent,
    companyHomeManageComponent
  ],
  providers: [
    companyService,
  ]
})
export default class CompanyManageModule {
}

