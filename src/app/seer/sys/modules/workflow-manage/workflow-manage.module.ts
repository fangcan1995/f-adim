import {NgModule} from "@angular/core";
import {BaseService} from "../../../base.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WorkflowManageComponent} from "./workflow-manage.component";
import {Routes, RouterModule} from "@angular/router";
import {WorkflowManageHomeComponent} from "./components/home/workflow-manage-home.component";
import {WorkflowManageListComponent} from "./components/list/workflow-manage-list.component";
import {WorkflowManageEditComponent} from "./components/edit/workflow-manage-edit.component";
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";

const routes: Routes = [
  {
    path: '',
    component: WorkflowManageComponent,
    children: [
      { path: '', component: WorkflowManageHomeComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgaModule,
    sharedModule
  ],
  declarations: [
    WorkflowManageComponent,
    WorkflowManageHomeComponent,
    WorkflowManageEditComponent,
    WorkflowManageListComponent
  ],
  providers: [
    BaseService
  ]
})
export default class RoleManageModule {
}
