import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { analysisRouting }       from './analysis.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import {AnalysisComponent} from "./analysis.component";


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    analysisRouting,
  ],
  declarations: [
    AnalysisComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class AnalysisModule {
}
