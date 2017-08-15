import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../../theme/nga.module';
import { routing }       from './message.routing';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';
@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing,
  ],
  declarations: [
    MessageComponent,
    MessageEditComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class MessageModule {
}
