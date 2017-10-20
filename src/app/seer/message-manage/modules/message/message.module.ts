import { NgModule } from '@angular/core';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../../theme/nga.module';
import { routing } from './message.routing';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';

import { SharedModule } from "../../../common/shared.module";
import { MessageService } from "./message.service";
@NgModule({
  imports: [

    NgaModule,
    RatingModule,
    routing,
    SharedModule,
  ],
  declarations: [
    MessageComponent,
    MessageEditComponent,

  ],
  entryComponents:[

  ],
  providers: [
    MessageService,
  ],
  exports: [
  ]
})
export class MessageModule {
}
