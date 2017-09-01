import { NgModule } from '@angular/core';
import { routing } from './security.routing';
import { SecurityComponent } from './security.component';

@NgModule({
  imports: [
    routing,
  ],
  declarations: [
    SecurityComponent,
  ],
})
export class SecurityModule {
}
