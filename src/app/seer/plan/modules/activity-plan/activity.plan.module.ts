import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import {ActivityPlanRouting} from "./activity.plan.routing";
import {ActivityPlanComponent} from "./activity.plan.component";
import {ActivityListComponent} from "./components/activityList/activity.list.component";
import {ActivityPlanService} from "./activity.plan.service";
import {ActivityEditComponent} from "./components/edit/activity.edit.component";




@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    ActivityPlanRouting
  ],
  declarations: [
    ActivityPlanComponent,
    ActivityListComponent,
    ActivityEditComponent
  ],
  providers: [
    ActivityPlanService
  ]
})
export default class ActivityModule {

}

