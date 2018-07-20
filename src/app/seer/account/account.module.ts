import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { SharedModule } from '../common/shared.module';
import { routing } from './account.routing';
import { AccountComponent} from './account.component';
import { AccountService } from './account.service';
import {PublicAccountComponent} from "./publicAccount/publicAccount.component";
import {AccountEditComponent} from "./publicAccount/account-edit/account-edit.component";

@NgModule({
  imports: [
    SharedModule,
    NgaModule,
    routing,
  ],
  declarations: [
    AccountComponent,
    PublicAccountComponent,
    AccountEditComponent
  ],
  providers:[
    AccountService
  ]
})
export class AccountModule {
}
