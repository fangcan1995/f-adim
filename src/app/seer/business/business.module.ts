import { NgModule } from '@angular/core';
import { routing } from './business.routing';
import {SharedModule} from "../common/shared.module";
import {NgaModule} from "../../theme/nga.module";


@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],

})
export class BusinessModule {
}
