import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { routing }       from './message-template.routing';
import { MessageTemplateComponent } from './message-template.component';
import { MessageTemplateEditComponent } from './components/message-template-edit/message-template-edit.component';

import {SharedModule} from "../../common/shared.module";
import {messageTplManageService} from "./message-template.service";
import { MessageTemplateDetailComponent} from "./components/message-template-detail/message-template-detail.component"

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    routing,
    SharedModule
  ],
  declarations: [
    MessageTemplateComponent,
    MessageTemplateEditComponent,
    MessageTemplateDetailComponent
  ],
  providers: [
    messageTplManageService
  ],
  exports: [
  ]
})
export class MessageTemplateModule {
}
