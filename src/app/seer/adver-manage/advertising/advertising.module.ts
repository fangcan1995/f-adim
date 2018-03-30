import {NgModule} from '@angular/core';
import {NgaModule} from '../../../theme/nga.module';
import {SharedModule} from "../../common/shared.module";

import {routing} from "./advertising.routing";
import {AdvertisingComponent} from "./advertising.component";
import {AdverEditComponent} from "./components/adver-edit/adver-edit.component";
import {AdverDetailComponent} from "./components/adver-detail/adver-detail.component";
import {AdvertisingService} from "./advertising.service";
import {FileUploadModule} from "ng2-file-upload";
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgxCurrencyModule} from "ngx-currency";
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    FileUploadModule,
    CustomFormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdvertisingComponent,
    AdverEditComponent,
    AdverDetailComponent,
  ],
  providers: [
    AdvertisingService,
  ],
})
export class AdvertisingModule {
}
