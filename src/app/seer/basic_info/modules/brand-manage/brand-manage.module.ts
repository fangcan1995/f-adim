import {NgModule} from "@angular/core";

import {Ng2SmartTableModule} from "ng2-smart-table";
import {NgaModule} from "../../../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {sharedModule} from "../../../common/shared.module";
import {BrandEditComponent} from "./components/brand-edit/brand-edit.component";
import {BrandOperationComponent} from "./components/brand-opration/brand-operation.component";
import {BrandListComponent} from "./components/brand-list/brand-list.component";
import {BrandHomeComponent} from "./components/brand-home/brand-home.component";
import {BrandManageComponent} from "./brand-manage.component";
import {brandManageRouting} from "./brand-manage.routing";
import {BrandManageService} from "./brand-manage.service";
import {Ng2CityComponent} from "./components/ng2-city/ng2-city.component";
import {BaseService} from "../../../base.service";
import {SaleManCListComponent} from "./components/dept/saleman-list.component";
import {Ng2Uploader} from "ng2-uploader";
import {contractService} from "../contract-manage/contrat-manage.service";







@NgModule({
  imports: [
    Ng2SmartTableModule,
    NgaModule,
    FormsModule,
    brandManageRouting,
    sharedModule
  ],
  declarations: [
    BrandManageComponent,
    BrandHomeComponent,
    BrandListComponent,
    BrandOperationComponent,
    BrandEditComponent,
    Ng2CityComponent,
    SaleManCListComponent,

  ],
  providers: [
    BrandManageService,
    BaseService,
    Ng2Uploader,
    contractService,

  ]
})
export default class BrandManageModule {
}
