import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgaModule } from "../../../../theme/nga.module";
import { sharedModule } from "../../../common/shared.module";
import { BaseService } from "../../../base.service";
import { routing } from './member.routing';
import { MemberComponent } from './member.component';
import { MemberService } from './member.service';

@NgModule({
  imports: [
    sharedModule,
    NgaModule,
    FormsModule,
    CommonModule,
    routing
  ],
  declarations: [
    MemberComponent,
  ],
  providers: [
    BaseService,
    MemberService
  ]
})
export class MemberModule {
}
