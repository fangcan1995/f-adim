import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SeerRoutingModule }       from './seer.routing';
import { NgaModule } from '../theme/nga.module';

import { SeerComponent } from './seer.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [RouterModule,CommonModule, NgaModule, SeerRoutingModule],
  declarations: [SeerComponent],
})
export class SeerModule {
}
