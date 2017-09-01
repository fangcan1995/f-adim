import { NgModule } from '@angular/core';
import { routing } from './operation.routing';
import { OperationComponent } from './operation.component';

@NgModule({
  imports: [
    routing,
  ],
  declarations: [
    OperationComponent,
  ],
})
export class OperationModule {
}
