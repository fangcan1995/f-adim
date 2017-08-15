import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../../theme/nga.module';
import { routing }       from './message-template.routing';
import { MessageTemplateComponent } from './message-template.component';
import { MessageTemplateEditComponent } from './components/message-template-edit/message-template-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing,
  ],
  declarations: [
    MessageTemplateComponent,
    MessageTemplateEditComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class MessageTemplateModule {
}
