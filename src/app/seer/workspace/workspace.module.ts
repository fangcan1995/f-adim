import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { SharedModule } from '../common/shared.module';
import { routing } from './workspace.routing';
import { WorkspaceService } from './workspace.service';
import { WorkspaceComponent } from './workspace.component';
import { TodoComponent } from './components/todo/todo.component';
import {DoneComponent} from "./components/done/done.component";


@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    routing,
  ],
  declarations: [
    WorkspaceComponent,
    TodoComponent,
    DoneComponent,
  ],
  providers:[
    WorkspaceService
  ]
})
export class WorkspaceModule {
}
