import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { routing } from './message.routing';
import { MessageComponent } from './message.component';
import { MessageEditComponent } from './components/message-edit/message-edit.component';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';
import { SharedModule } from "../../common/shared.module";
import { MessageService } from "./message.service";
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgxCurrencyModule} from "ngx-currency";
@NgModule({
  imports: [
    NgaModule,
    routing,
    SharedModule,
    CustomFormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule
  ],
  declarations: [
    MessageComponent,
    MessageEditComponent,
    MessageDetailComponent
  ],
  entryComponents:[

  ],
  providers: [
    MessageService,
  ],
  exports: [
  ]
})
export class MessageManageModule {
}
