import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {FormsModule as AngularFormsModule, FormsModule} from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import {BaseService} from "../base.service";
import {planRouting} from "./sys.routing";
import {PlanComponent} from "./plan.component";

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    planRouting,
  ],
  declarations: [
    PlanComponent,
  ],

  providers: [
    BaseService,
  ]
})
export class PlanModule {
}
