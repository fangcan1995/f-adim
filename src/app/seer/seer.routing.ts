import { Routes, RouterModule }  from '@angular/router';
import { SeerComponent } from './seer.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [

  {
    path: 'seer',
    component: SeerComponent,
    children:
      [
        { path: '', redirectTo: 'workspace', pathMatch: 'full' },
        { path: 'home', loadChildren:'./home/home.module#HomeModule' },
        { path: 'workspace', loadChildren:'./workspace/workspace.module#WorkspaceModule' },
        { path: 'business', loadChildren:'./business/business.module#BusinessModule' },
        { path: 'basic', loadChildren:'./basic_info/basic_info.module#BasicInfoModule' },
        { path: 'sys', loadChildren:'./sys/sys.module#SysModule' },
        { path: 'operation', loadChildren: './operation/operation.module#OperationModule' },
        { path: 'security', loadChildren: './security/security.module#SecurityModule' },
        { path: 'content', loadChildren: './content/content.module#ContentModule' },
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeerRoutingModule {
}

