import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './red-packet.routing';
import { RedPacketService } from "./red-packet.service";
import { RedPacketComponent } from './red-packet.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    RedPacketComponent,
  ],
  providers: [
    RedPacketService,
  ]
})
export class RedPacketModule {
}
