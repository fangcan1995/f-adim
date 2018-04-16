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
import {TradesInfoComponent} from "./components/member-detail/tradesInfo/tradesInfo.component";
import {MemberCoinPip} from "./components/member-pip/memberCoin-pip"
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgxCurrencyModule} from "ngx-currency";
@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    routing,
    CustomFormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule
  ],
  declarations: [
    MemberComponent,
    MemberEditComponent,
    MemberDetailComponent,
    MemberInfoComponent,
    LoansInfoComponent,
    InvestsInfoComponent,
    TradesInfoComponent,
    MemberCoinPip
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule {
}
