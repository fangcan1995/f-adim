import {
  Routes,
  RouterModule,
}  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IntentionComponent } from './intention.component';

const routes: Routes = [
  {
    path: '',
    component: IntentionComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
