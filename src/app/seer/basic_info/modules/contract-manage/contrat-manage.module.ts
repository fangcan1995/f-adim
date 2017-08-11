import {NgModule} from "@angular/core";

import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";
import {ContratManageComponent} from "./contrat-manage.component";
import {contratManageRouting} from "./contrat-manage.routing";


import {contractEditComponent} from "./components/edit/contractEditcomponent";
import {contractListComponent} from "./components/list/contratList.component";
import {contractService} from "./contrat-manage.service";



@NgModule({
  imports: [
    NgaModule,
    contratManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
  ],
  declarations: [
    ContratManageComponent,
    contractListComponent,
    contractEditComponent
  ],
  providers: [
    contractService
  ]
})
export default class ContratManageModule {
}
