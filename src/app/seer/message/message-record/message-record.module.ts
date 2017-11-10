import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { routing }       from './message-record.routing';

import { MessageRecordComponent } from './message-record.component';

import {BaseService} from "../../base.service";
import {SharedModule} from "../../common/shared.module";


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    routing,
    SharedModule
  ],
  declarations: [
    MessageRecordComponent
  ],
  providers: [
    BaseService,
    /*messageTplManageService*/
  ],
  exports: [
  ]
})
export class MessageRecordModule {
}
