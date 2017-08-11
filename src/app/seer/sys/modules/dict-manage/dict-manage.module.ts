import {NgModule} from "@angular/core";
import {dictManageRouting} from "./dict-manage.routing";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";
import {DictComponent} from "./components/dict.component";
import {DictManageService} from "./dict-manage.service";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import {DictManageComponent} from "./dict-manage.component";


@NgModule({
  imports: [
    NgaModule,
    dictManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    DictComponent,
    DictManageComponent,
  ],
  providers: [
    DictManageService
  ]
})
export default class DictManageModule {
}
