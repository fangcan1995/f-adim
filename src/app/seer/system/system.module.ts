import { NgModule } from '@angular/core';
import { routing } from './system.routing';
import { SystemComponent } from './system.component';

@NgModule({
  imports: [
    routing,
  ],
  declarations: [
    SystemComponent,
  ]
})
export class SystemModule {
}
