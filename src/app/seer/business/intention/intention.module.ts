import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './intention.routing';
import { IntentionComponent } from './intention.component';
import { IntentionService } from "./intention.service";

import { IntentionEditComponent } from './components/intention-edit/intention-edit.component';
import {IntentionCompletionComponent} from "./components/intention-completion/intention-completion.component";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    IntentionComponent,
    IntentionEditComponent,
    IntentionCompletionComponent,
  ],
  providers: [
    IntentionService,
  ],
  exports: [
  ]
})
export class IntentionModule {
}
