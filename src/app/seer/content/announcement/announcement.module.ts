import {NgModule} from "@angular/core";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";

import {AnnouncementComponent} from "./announcement.component";
import {AnnouncementEditComponent} from "./components/announcement-edit/announcement-edit.component";
import {AnnouncementService} from "./announcement.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import {routing} from "./announcement.routing";
import {NgxCurrencyModule} from "ngx-currency";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  declarations: [
    AnnouncementComponent,
    AnnouncementEditComponent
  ],
  providers: [
    AnnouncementService
  ]
})
export class AnnouncementModule {
}
