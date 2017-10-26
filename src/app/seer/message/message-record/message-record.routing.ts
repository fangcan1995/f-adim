import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


import { MessageRecordComponent } from "./message-record.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: MessageRecordComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
