import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NgaModule } from '../theme/nga.module';

import { SeerComponent } from './seer.component';
import { routing } from './seer.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    routing,
  ],
  declarations: [SeerComponent],
})
export class SeerModule {
}
