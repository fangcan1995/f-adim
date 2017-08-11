import { NgModule }      from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WorkspaceHomeComponent} from "./components/home/workspace-home.component";
import {NgaModule} from "../../theme/nga.module";
import {WorkspaceComponent} from "./workspace.component";
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {WorkspaceService} from "./workspace.service";

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {path:'', component:WorkspaceHomeComponent},
    ]
  }
];

const SERVICES = [
  WorkspaceService
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    WorkspaceComponent,
    WorkspaceHomeComponent,
    TodoListComponent
  ],
  providers:[...SERVICES]
})
export class WorkspaceModule {
}
