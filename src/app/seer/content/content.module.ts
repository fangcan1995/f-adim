import { NgModule } from '@angular/core';
import { routing } from './content.routing';
import { ContentComponent } from './content.component';

@NgModule({
  imports: [
    routing,
  ],
  declarations: [
    ContentComponent,
  ],
})
export class ContentModule {
}
