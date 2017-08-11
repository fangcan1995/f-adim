import {NgModule} from "@angular/core";
import {targetManageRouting} from "./target-manage.routing";
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';




import {sharedModule} from "../../../common/shared.module";
import {TargetComponent} from "./components/target.component";
import {TargetManageService} from "./target-manage.service";
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import {TargetManageComponent} from "./target-manage.component";
import {NgaModule} from "../../../../theme/nga.module";
import {BrandTreeComponent} from "./components/brandTree/brand-tree.component";
import {CustomerStoreTreeComponent} from "./components/customerStoreTree/customer-store-tree.component";


@NgModule({
  imports: [
    NgaModule,
    targetManageRouting,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
  ],
  declarations: [
    TargetComponent,
    TargetManageComponent,
    BrandTreeComponent,
    CustomerStoreTreeComponent,
  ],
  providers: [
    TargetManageService
  ]
})
export default class TargetManageModule {
}
