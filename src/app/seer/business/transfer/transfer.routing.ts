import {
  Routes,
  RouterModule,
}  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TransferComponent } from './transfer.component';
import { TransferEditComponent } from './components/transfer-edit/transfer-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TransferComponent,
      },
      {
        path: 'add',
        component: TransferEditComponent,
      },
      {
        path: 'edit/:id',
        component: TransferEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
