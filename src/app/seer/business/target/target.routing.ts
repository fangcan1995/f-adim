import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TargetComponent} from "./target.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: TargetComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
