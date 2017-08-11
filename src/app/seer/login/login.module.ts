import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { routing }       from './login.routing';
import {LoginService} from "./login.service";
import {NgaModule} from "../../theme/nga.module";
import {VersionInfoComponent} from "./component/version-info.component";



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    LoginComponent,
    VersionInfoComponent
  ],
  providers: [
    LoginService
  ],
  entryComponents:[
    VersionInfoComponent
  ]
})
export class LoginModule {}
