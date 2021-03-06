import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SeerComponent } from './seer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from '../theme/services/auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: '',
    component: SeerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren:'./home/home.module#HomeModule' },
      { path: 'workspace', loadChildren:'./workspace/workspace.module#WorkspaceModule' },
      { path: 'business', loadChildren:'./business/business.module#BusinessModule' },
      { path: 'basic-info', loadChildren:'./basic-info/basic-info.module#BasicInfoModule' },
      { path: 'system', loadChildren:'./system/system.module#SystemModule' },
      { path: 'operation', loadChildren: './operation/operation.module#OperationModule' },
      { path: 'security', loadChildren: './security/security.module#SecurityModule' },
      { path: 'content', loadChildren: './content/content.module#ContentModule' },
      { path: 'message', loadChildren: './message/message.module#MessageModule' },
      { path: 'adver-manage', loadChildren: './adver-manage/adver-manage.module#AdverManageModule' },
      {
          path: 'statistic',
          loadChildren: './statistic/statistic.module#StatisticModule'
      },
      { path: 'account', loadChildren: './account/account.module#AccountModule' },

    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
