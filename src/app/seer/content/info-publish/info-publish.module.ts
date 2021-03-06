import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './info-publish.routing';
import { InfoPublishService } from "./info-publish.service";

import { InfoPublishComponent } from './info-publish.component';
import { InfoPublishEditComponent } from './components/info-publish-edit/info-publish-edit.component';
import { InfoPublishDialogComponent } from "./components/info-publish-dialog/info-publish-dialog";
import {BaseService} from "../../base.service";
import { TreeModule } from "app/theme/modules";
import { ModalComponent } from "../../../theme/components/ng2-bs4-modal/modal";
import {FileUploadModule} from "ng2-file-upload";

import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgxCurrencyModule} from "ngx-currency";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    TreeModule,
    FileUploadModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxCurrencyModule
  ],
  declarations: [
    InfoPublishComponent,
    InfoPublishEditComponent,
    InfoPublishDialogComponent
  ],
  providers: [
    InfoPublishService,
    BaseService,
    ModalComponent,
  ],
})
export class InfoPublishModule {
}
