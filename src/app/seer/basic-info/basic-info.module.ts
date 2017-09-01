import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { BasicInfoComponent } from "./basic-info.component";
import { routing } from "./basic-info.routing";


@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    FormsModule,
    RatingModule,
    routing
  ],
  declarations: [
    BasicInfoComponent,
  ],
})
export class BasicInfoModule {
}
