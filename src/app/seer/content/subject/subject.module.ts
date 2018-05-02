import {NgModule} from "@angular/core";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";

import {SubjectComponent} from "./subject.component";
import {SubjectEditComponent} from "./components/subject-edit/subject-edit.component";
import {SubjectService} from "./subject.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import {routing} from "./subject.routing";
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
    SubjectComponent,
    SubjectEditComponent
  ],
  providers: [
    SubjectService
  ]
})
export class SubjectModule {
}
