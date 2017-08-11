import {NgModule} from "@angular/core";
import {alertManageRouting} from "./alert-manage.routing";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";
import {AlertManageComponent} from "./alert-manage.component";
import {alertComponent} from "./components/alert.component";
import {alertService} from "./alert-manage.service";


import {DatepickerModule, TabsModule} from 'ng2-bootstrap';

@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    alertManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    alertComponent,
    AlertManageComponent,
  ],
  providers: [
    alertService
  ]
})
export default class AlertManageModule {
}
