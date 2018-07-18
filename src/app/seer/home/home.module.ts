import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  Routes,
  RouterModule,
} from "@angular/router";
import { NgaModule } from "../../theme/nga.module";
import { routing } from './home.routing';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    FormsModule,
    routing,
    NgxEchartsModule,
    CalendarModule

  ],
  declarations: [
    HomeComponent,
  ],
  providers:[
    HomeService,
  ]
})
export class HomeModule {
}
