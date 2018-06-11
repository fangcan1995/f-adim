import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TransferComponent} from "./transfer.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: TransferComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
