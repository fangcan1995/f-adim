import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";
import { routing } from "./dict.routing";

import { DictService } from './dict.service';
import { DictComponent } from './dict.component';
import { DictEditComponent } from './components/dict-edit/dict-edit.component';

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    DictComponent,
    DictEditComponent,
  ],
  providers: [
    DictService,
  ]
})
export class DictModule {
}
