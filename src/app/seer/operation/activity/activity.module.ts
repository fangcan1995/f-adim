import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from "../../common/shared.module";

import { routing } from './activity.routing';
import { ActivityService } from "./activity.service";
import { ActivityComponent } from './activity.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    ActivityComponent,
    ActivityEditComponent,
    ActivityDetailComponent,
  ],
  providers: [
    ActivityService,
  ],
})
export class ActivityModule {
}
