import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './target.routing';
import { TargetService } from "./target.service";

import { TargetComponent } from './target.component';
import { TargetEditComponent } from './components/target-edit/target-edit.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    TargetComponent,
    TargetEditComponent,
  ],
  providers: [
    TargetService,
  ],
})
export class TargetModule {
}
