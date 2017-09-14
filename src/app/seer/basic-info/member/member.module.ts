import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";
import { routing } from './member.routing';

import { MemberComponent } from './member.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';

import { MemberService } from './member.service';

@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    routing,
  ],
  declarations: [
    MemberComponent,
    MemberEditComponent,
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule {
}
