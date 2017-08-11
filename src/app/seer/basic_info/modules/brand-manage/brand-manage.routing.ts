import { Routes, RouterModule }  from '@angular/router';


import {BrandEditComponent} from "./components/brand-edit/brand-edit.component";
import {BrandHomeComponent} from "./components/brand-home/brand-home.component";
import {BrandManageComponent} from "./brand-manage.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: BrandManageComponent,
    children: [
      { path: '',   component: BrandHomeComponent},
      { path: 'edit',component :BrandEditComponent },
      { path: 'edit/:id',component :BrandEditComponent }

    ]
  }
];

export const brandManageRouting = RouterModule.forChild(routes);
