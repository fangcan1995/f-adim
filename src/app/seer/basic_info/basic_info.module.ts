import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';



import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import {BasicInfoComponent} from "./basic_info.component";
import {basicInfoRouting} from "./basic_info.routing";


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    basicInfoRouting
  ],
  declarations: [
    BasicInfoComponent,
  ],
  providers: [

  ],
  exports: [
  ]
})
export class BasicInfoModule {
}
