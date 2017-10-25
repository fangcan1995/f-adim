import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './transfer.routing';
/*import { TargetService } from "./target.service";*/

import { TransferComponent } from './transfer.component';
import { TransferEditComponent } from './components/transfer-edit/transfer-edit.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    TransferComponent,
    TransferEditComponent,
  ],
  /*providers: [
    TargetService,
  ],*/
})
export class TransferModule {
}
