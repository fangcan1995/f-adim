import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AdvertisingComponent} from "./advertising.component";
import {AdverEditComponent} from "./components/adver-edit/adver-edit.component";

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
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
