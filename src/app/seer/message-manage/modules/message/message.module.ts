import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../../theme/nga.module';
import { routing }       from './message.routing';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';
import { MessageAddComponent } from './components/message-add/message-add.component';
import { sharedModule } from "../../../common/shared.module";
import {MessageService} from "./message.service";
@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing,
    sharedModule,
  ],
  declarations: [
    MessageComponent,
    MessageEditComponent,
    MessageAddComponent,
  ],
  providers: [
    MessageService,

  ],
  exports: [
  ]
})
export class MessageModule {
}
