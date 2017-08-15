import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../../theme/nga.module';
import { routing }       from './message-template.routing';
import { MessageTemplateComponent } from './message-template.component';

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
  ],
  providers: [
  ],
  exports: [
  ]
})
export class MessageTemplateModule {
}
