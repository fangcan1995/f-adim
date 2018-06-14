import {NgModule} from "@angular/core";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";

import {SpecialComponent} from "./special.component";
import {SpecialEditComponent} from "./components/special-edit/special-edit.component";
import {SpecialService} from "./special.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import {routing} from "./special.routing";
import {NgxCurrencyModule} from "ngx-currency";


@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  declarations: [
    SpecialComponent,
    SpecialEditComponent
  ],
  providers: [
    SpecialService
  ]
})
export class SpecialModule {
}
