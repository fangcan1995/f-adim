import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SeerComponent } from './seer.component';

const routes: Routes = [
  {
    path: 'seer',
    component: SeerComponent,
    children: [
      { path: '', redirectTo: 'workspace', pathMatch: 'full' },
      { path: 'home', loadChildren:'./home/home.module#HomeModule' },
      { path: 'workspace', loadChildren:'./workspace/workspace.module#WorkspaceModule' },
      { path: 'business', loadChildren:'./business/business.module#BusinessModule' },
      { path: 'basic-info', loadChildren:'./basic-info/basic-info.module#BasicInfoModule' },
      { path: 'system', loadChildren:'./system/system.module#SystemModule' },
      { path: 'operation', loadChildren: './operation/operation.module#OperationModule' },
      { path: 'security', loadChildren: './security/security.module#SecurityModule' },
      { path: 'content', loadChildren: './content/content.module#ContentModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
