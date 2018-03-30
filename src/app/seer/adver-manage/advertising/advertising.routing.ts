import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AdvertisingComponent} from "./advertising.component";
import {AdverEditComponent} from "./components/adver-edit/adver-edit.component";
import {AdverDetailComponent} from "./components/adver-detail/adver-detail.component";
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdvertisingComponent,
      },
      {
        path: 'add',
        component: AdverEditComponent,
      },
      {
        path: 'edit/:id',
        component: AdverEditComponent,
      },
      {
        path: 'detail/:id',
        component: AdverDetailComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
