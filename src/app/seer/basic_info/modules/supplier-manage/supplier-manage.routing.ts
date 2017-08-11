import {RouterModule, Routes} from "@angular/router";
import {SupplierManageComponent} from "./supplier-manage.component";
import {SupplierHomeComponent} from "./component/supplier-home/supplier-home.component";
import {SupplierEditComponent} from "./component/supplier-edit/supplier-edit.component";
/**
 * Created by Administrator on 2016/12/26.
 */
const routes: Routes = [
  {
    path: '',
    component: SupplierManageComponent,
    children: [
      { path: '', component: SupplierHomeComponent},
      { path: 'add', component: SupplierEditComponent},
      { path: 'edit/:id', component: SupplierEditComponent},
    ]
  }
];
export const SupplierManageRouting = RouterModule.forChild(routes);
