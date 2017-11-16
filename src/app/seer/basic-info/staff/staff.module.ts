import { NgModule } from '@angular/core';
import { NgaModule } from '../../../theme/nga.module';
import { SharedModule } from '../../common/shared.module';

import { routing } from './staff.routing';
import { StaffService } from './staff.service';

import { StaffComponent } from './staff.component';
import { StaffEditComponent } from './components/staff-edit/staff-edit.component';
import {StaffAddComponent} from "./components/staff-add/staff-add.component"
import {StaffDetailComponent} from "./components/staff-detail/staff-detail.component";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing,
  ],
  declarations: [
    StaffComponent,
    StaffEditComponent,
    StaffAddComponent,
    StaffDetailComponent
  ],
  providers: [
    StaffService
  ]
})
export  class StaffModule {
}
