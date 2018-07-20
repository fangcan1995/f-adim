import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AccountComponent } from './account.component';
import {AccountEditComponent} from "./publicAccount/account-edit/account-edit.component";
const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'add',
    component: AccountEditComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
