import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { sysRouting }       from './sys.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SysComponent } from './sys.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    sysRouting,
  ],
  declarations: [
    SysComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class SysModule {
}
