import {NgModule} from "@angular/core";

import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import {carManageRouting} from "./car-manage.routing";
import {carComponent} from "./components/car.component";
import {CarManageComponent} from "./car-manage.component";

@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    carManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    carComponent,
    CarManageComponent
  ],
  providers: [

  ]
})
export default class CarManageModule {
}

