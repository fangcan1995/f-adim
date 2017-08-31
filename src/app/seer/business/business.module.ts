import { NgModule } from '@angular/core';
import { routing } from './business.routing';
import { BusinessComponent } from './business.component';

@NgModule({
  imports: [
    routing,
  ],
  declarations: [
    BusinessComponent,
  ],
})
export class BusinessModule {
}
