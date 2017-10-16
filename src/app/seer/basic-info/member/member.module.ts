import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { SharedModule } from "../../common/shared.module";
import { routing } from './member.routing';

import { MemberComponent } from './member.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import {MemberDetailComponent} from "./components/member-detail/member-detail.component";
import { MemberService } from './member.service';
import {MemberInfoComponent} from "./components/member-detail/memberInfo/memberInfo.component"
import {LoansInfoComponent} from "./components/member-detail/loansInfo/loansInfo.component"
import {InvestsInfoComponent} from "./components/member-detail/investsInfo/investsInfo.component";
import {TradesInfoComponent} from "./components/member-detail/tradesInfo/tradesInfo.component"
@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    routing,
  ],
  declarations: [
    MemberComponent,
    MemberEditComponent,
    MemberDetailComponent,
    MemberInfoComponent,
    LoansInfoComponent,
    InvestsInfoComponent,
    TradesInfoComponent
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule {
}
