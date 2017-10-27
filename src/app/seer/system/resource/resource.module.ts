import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";
import { routing } from "./resource.routing";
import { ResourceService } from "./resource.service";
import { ResourceComponent } from "./resource.component";
import { ResourceEditComponent } from "./components/resource-edit/resource-edit.component";

@NgModule({
  imports: [
    NgaModule,
    SharedModule,
    routing
  ],
  declarations: [
    ResourceComponent,
    ResourceEditComponent
  ],
  providers: [
    ResourceService,
  ]
})
export class ResourceModule {
}
