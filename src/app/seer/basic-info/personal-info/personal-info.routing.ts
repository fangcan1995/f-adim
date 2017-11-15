import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PersonalInfoComponent} from "./personal-info.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: ':id', component: PersonalInfoComponent}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
