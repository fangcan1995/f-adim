import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { CriteriaRoutingModule }       from './criteria.routing';
import { NgaModule } from '../theme/nga.module';

import { CriteriaComponent } from './criteria.component';
import { RouterModule } from "@angular/router";
import {CriteriaHomeComponent} from "./criteria-home/criteria-home.component";
import {SeerTreeDemoComponent} from "./seer-tree/seer-tree-demo.component";
import {FormsModule} from "@angular/forms";
import {SeerTreeDemoDialogComponent} from "./seer-tree/seer-tree-demo-dialog.component";
import {ValidatorDemoComponent} from "./validator/validator-demo.component";

const DECLARATIONS = [
  CriteriaComponent,
  CriteriaHomeComponent,
  SeerTreeDemoComponent,
  SeerTreeDemoDialogComponent,
  ValidatorDemoComponent
];

@NgModule({
  imports: [RouterModule,CommonModule, NgaModule,FormsModule, CriteriaRoutingModule],
  declarations: [...DECLARATIONS],
})
export class CriteriaModule {
}
