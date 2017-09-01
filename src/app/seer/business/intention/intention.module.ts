import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './intention.routing';
import { IntentionComponent } from './intention.component';
import { IntentionService } from "./intention.service";

import { IntentionEditComponent } from './components/intention-edit/intention-edit.component';

@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    IntentionComponent,
    IntentionEditComponent,
  ],
  providers: [
    IntentionService,
  ],
  exports: [
  ]
})
export class IntentionModule {
}
