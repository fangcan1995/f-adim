import { NgModule } from '@angular/core';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../theme/nga.module';
import { routing } from './message.routing';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';
import { MessageAddComponent } from './components/message-add/message-add.component';
// import { MessageAddedDialogComponent } from './components/message-added-dialog/message-added-dialog.component';
import { MessageAddedDialogComponent } from './components/message-added-dialog/message-added-dialog.component';
import { MessageEditDialogComponent } from "./components/message-edit-dialog/message-edit-dialog.component";
import { SharedModule } from "../../common/shared.module";
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
    MessageAddComponent,
    MessageAddedDialogComponent,
    MessageEditDialogComponent
  ],
  entryComponents:[
     MessageAddedDialogComponent,
  ],
  providers: [
    MessageService,
  ],
  exports: [
  ]
})
export class MessageModule {
}
