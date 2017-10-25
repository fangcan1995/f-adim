import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './parameter.routing';
/*import { TargetService } from "./target.service";*/

import { ParameterComponent } from './parameter.component';
import { ParameterEditComponent } from './components/parameter-edit/parameter-edit.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    ParameterComponent,
    ParameterEditComponent,
  ],
  /*providers: [
    TargetService,
  ],*/
})
export class ParameterModule {
}
