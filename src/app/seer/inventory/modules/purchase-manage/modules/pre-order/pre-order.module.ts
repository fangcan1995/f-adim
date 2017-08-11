import { NgModule }      from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {PreOrderComponent} from "./pre-order.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {sharedModule} from "../../../../../common/shared.module";
import {NgaModule} from "../../../../../../theme/nga.module";
import {PreOrderHomeComponent} from "./components/home/pre-order-home.component";

const routes: Routes = [
  {
    path: 'pre-order-manage',
    component: PreOrderComponent,
    children: [
      {path:'', component:PreOrderHomeComponent},
    ]
  }
];


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    sharedModule,
    NgaModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PreOrderComponent,
    PreOrderHomeComponent
  ],
})
export default class PreOrderModule {
}
