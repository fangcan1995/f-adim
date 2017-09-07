import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './info-publish.routing';
import { InfoPublishService } from "./info-publish.service";

import { InfoPublishComponent } from './info-publish.component';
import { InfoPublishEditComponent } from './components/info-publish-edit/info-publish-edit.component';
import {BaseService} from "../../base.service";
import { TreeModule } from "app/theme/modules";
import {Ng2Uploader} from "ng2-uploader";
import { ModalComponent } from "../../../theme/components/ng2-bs4-modal/modal";
@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
    TreeModule
  ],
  declarations: [
    InfoPublishComponent,
    InfoPublishEditComponent,
  ],
  providers: [
    InfoPublishService,
    BaseService,
    Ng2Uploader,
    ModalComponent,
  ],
})
export class InfoPublishModule {
}
