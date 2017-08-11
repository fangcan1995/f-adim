import {NgModule} from "@angular/core";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import {actingmatPlanRouting} from "./actingmat-plan.routing";
import {ActingmatComponent} from "./components/actingmat.component";
import {ActingmatPlanComponent} from "./actingmat-plan.component";
import {ActingmatPlanService} from "./actingmat-plan.service";
import {BudgetAddedDialogComponent} from "./components/budgetAddDialog/budget-added-dialog.component";
import {AttachDetailComponent} from "./components/attachDetail/attach-detail.component";
import {StaffListComponent} from "./components/staffList/staff-list.component";
import {ActingStoreTreeComponent} from "./components/actingStoreTree/acting-store-tree.component";


@NgModule({
  imports: [
    NgaModule,
    actingmatPlanRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    ActingmatPlanComponent,
    ActingmatComponent,
    BudgetAddedDialogComponent,
    AttachDetailComponent,
    StaffListComponent,
    ActingStoreTreeComponent,
  ],
  providers: [
    ActingmatPlanService,
  ]
})
export default class ActingmatPlanModule {
}
