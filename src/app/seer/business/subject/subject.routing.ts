import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {SubjectComponent} from "./subject.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: SubjectComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
