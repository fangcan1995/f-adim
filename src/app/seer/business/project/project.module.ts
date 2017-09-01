import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { sharedModule } from "../../common/shared.module";

import { routing } from './project.routing';
import { ProjectService } from "./project.service";

import { ProjectComponent } from './project.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

@NgModule({
  imports: [
    NgaModule,
    sharedModule,
    routing,
  ],
  declarations: [
    ProjectComponent,
    ProjectEditComponent,
  ],
  providers: [
    ProjectService,
  ],
})
export class ProjectModule {
}
