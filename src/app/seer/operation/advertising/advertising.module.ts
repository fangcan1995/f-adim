import {NgModule} from '@angular/core';
import {NgaModule} from '../../../theme/nga.module';
import {SharedModule} from "../../common/shared.module";

import {routing} from "./advertising.routing";
import {AdvertisingComponent} from "./advertising.component";
import {AdvertisingEditComponent} from "./components/advertising-edit/advertising-edit.component";
import {AdvertisingService} from "./advertising.service";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    AdvertisingComponent,
    AdvertisingEditComponent,
  ],
  providers: [
    AdvertisingService,
  ],
})
export class AdvertisingModule {
}
