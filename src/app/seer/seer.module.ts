import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NgaModule } from '../theme/nga.module';

import { SeerComponent } from './seer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routing } from './seer.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    routing,
  ],
  declarations: [
  	SeerComponent,
  	PageNotFoundComponent,
  ],
})
export class SeerModule {
}
