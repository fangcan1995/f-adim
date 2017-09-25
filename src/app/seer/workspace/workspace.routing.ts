import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';
const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
