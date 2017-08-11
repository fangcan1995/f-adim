import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgaModule} from "../../../../theme/nga.module";
import {sharedModule} from "../../../common/shared.module";
import {BaseService} from "../../../base.service";
import {GoodsManageService} from "./goods-manage.service";
import {BrandManageService} from "../brand-manage/brand-manage.service";
import {GoodsManageRouting} from "./goods-manage.routing";
import {GoodsManageComponent} from "./goods-manage.component";
import {GoodsHomeComponent} from "./component/goods-home/goods-home.component";
import {GoodsOperationComponent} from "./component/goods-operation/goods-operation.component";
import {GoodsListComponent} from "./component/goods-list/goods-list.component";
import {GoodsAddComponent} from "./component/goods-add/goods-add.component";
import {GoodsDetailDialogComponent} from "./component/goods-detail/goods-detail.component";
import {GoodsTerminalDialogComponent} from "./component/goods-terminal-dialog/goods-terminal-dialog";
import {GoodsCustomFieldsDialogComponent} from "./component/goods-add-customFields/goods-add-customFields.component";

/**
 * Created by Administrator on 2016/12/26.
 */
@NgModule({
  imports: [
    sharedModule,
    NgaModule,
    FormsModule,
    CommonModule,
    GoodsManageRouting
  ],
  declarations: [
    GoodsManageComponent,
    GoodsHomeComponent,
    GoodsOperationComponent,
    GoodsListComponent,
    GoodsAddComponent,
    GoodsDetailDialogComponent,
    GoodsTerminalDialogComponent,
    GoodsCustomFieldsDialogComponent
  ],
  providers: [
    GoodsManageService,
    BrandManageService,
    BaseService
  ]
})
export class GoodsManageModule {
}
