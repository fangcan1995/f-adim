import {NgModule} from "@angular/core";
import {NgaModule} from "../../../theme/nga.module";
import {SharedModule} from "../../common/shared.module";

import {AnnouncementComponent} from "./announcement.component";
import {AnnouncementEditComponent} from "./components/announcement-edit/announcement-edit.component";
import {AnnouncementService} from "./announcement.service";
import {routing} from "./announcement.routing";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing
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
