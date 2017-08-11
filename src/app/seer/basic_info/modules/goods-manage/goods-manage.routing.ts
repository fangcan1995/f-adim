import {RouterModule, Routes} from "@angular/router";
import {GoodsManageComponent} from "./goods-manage.component";
import {GoodsHomeComponent} from "./component/goods-home/goods-home.component";
import {GoodsAddComponent} from "./component/goods-add/goods-add.component";

/**
 * Created by Administrator on 2016/12/26.
 */
const routes: Routes = [
  {
    path: '',
    component: GoodsManageComponent,
    children: [
      { path: '', component: GoodsHomeComponent},
      { path: 'add', component: GoodsAddComponent},
      { path: 'edit/:id', component: GoodsAddComponent},
    ]
  }
];
export const GoodsManageRouting = RouterModule.forChild(routes);
