import {NgModule} from '@angular/core';
import {NgaModule} from '../../../theme/nga.module';
import {SharedModule} from "../../common/shared.module";

import {routing} from "./advertising.routing";
import {AdvertisingComponent} from "./advertising.component";
import {AdverEditComponent} from "./components/adver-edit/adver-edit.component";
import {AdvertisingService} from "./advertising.service";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    AdvertisingComponent,
    AdverEditComponent,
  ],
  providers: [
    AdvertisingService,
  ],
})
export class AdvertisingModule {
}
