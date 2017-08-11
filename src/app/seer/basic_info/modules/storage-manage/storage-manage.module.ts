import {NgModule} from "@angular/core";

import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';


import {NgaModule} from "../../../../theme/nga.module";

import {sharedModule} from "../../../common/shared.module";

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import {storageManageRouting} from "./storage-manage.routing";
import {StorageManageComponent} from "./storage-manage.component";
import {StorageListComponent} from "./components/list/storage-list.component";
import {StorageManageService} from "./storage-manage.service";
import {BaseService} from "../../../base.service";
import {EditStorageComponent} from "./components/edit/edit-storage.component";
import {BrandTreeComponent} from "./components/brandTree/brand-tree.component";
import {TargetManageService} from "../target-manage/target-manage.service";

@NgModule({
  imports: [
    DatepickerModule,
    NgaModule,
    CommonModule,
    FormsModule,
    sharedModule,
    TabsModule,
    storageManageRouting,
  ],
  declarations: [
    StorageManageComponent,
    StorageListComponent,
    EditStorageComponent,
    BrandTreeComponent

  ],
  providers: [
    BaseService,
    StorageManageService,
    TargetManageService
  ]
})
export default class StorageManageModule {
}

