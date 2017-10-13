import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './red-packet.routing';
import { RedPacketService } from "./red-packet.service";
import { RedPacketComponent } from './red-packet.component';
import { RedPacketEditComponent } from './components/red-packet-edit/red-packet-edit.component';
import { RedPacketAddComponent } from './components/red-packet-add/red-packet-add.component';
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    RedPacketComponent,
    RedPacketEditComponent,
    RedPacketAddComponent,
  ],
  providers: [
    RedPacketService,
  ]
})
export class RedPacketModule {
}
