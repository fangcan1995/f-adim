import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../../../theme/nga.module';
import { routing }       from './message-template.routing';
import { MessageTemplateComponent } from './message-template.component';
import { MessageTemplateEditComponent } from './components/message-template-edit/message-template-edit.component';

import {BaseService} from "../../../base.service";
import {sharedModule} from "../../../common/shared.module";
import {messageTplManageService} from "./message-template.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing,
    sharedModule
  ],
  declarations: [
    MessageTemplateComponent,
    MessageTemplateEditComponent,
  ],
  providers: [
    BaseService,
    messageTplManageService
  ],
  exports: [
  ]
})
export class MessageTemplateModule {
}
