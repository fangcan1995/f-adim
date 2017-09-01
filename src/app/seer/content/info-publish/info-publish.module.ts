import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './info-publish.routing';
import { InfoPublishService } from "./info-publish.service";

import { InfoPublishComponent } from './info-publish.component';
import { InfoPublishEditComponent } from './components/info-publish-edit/info-publish-edit.component';

import { SeerTree } from '../../../theme/modules/seer-tree/seer-tree/seer-tree.component';
import { BaCard } from '../../../theme/components/baCard/baCard.component';
@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    InfoPublishComponent,
    InfoPublishEditComponent,
  ],
  providers: [
    InfoPublishService,
    SeerTree,
    BaCard,
  ],
})
export class InfoPublishModule {
}
