import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './red-packet.routing';
import { RedPacketService } from "./red-packet.service";
import { RedPacketComponent } from './red-packet.component';
import { RedPacketEditComponent } from './components/red-packet-edit/red-packet-edit.component';

@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    RedPacketComponent,
    RedPacketEditComponent,
  ],
  providers: [
    RedPacketService,

  ],
  exports: [
  ]
})
export class RedPacketModule {
}
