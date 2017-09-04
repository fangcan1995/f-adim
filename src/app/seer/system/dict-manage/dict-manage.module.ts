import { NgModule } from "@angular/core";
import { dictManageRouting } from "./dict-manage.routing";
import { NgaModule } from "../../../theme/nga.module";
import { sharedModule } from "../../common/shared.module";

import { DictComponent } from "./components/dict.component";
import { DictManageService } from "./dict-manage.service";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DictManageComponent } from "./dict-manage.component";


@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    dictManageRouting,
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
