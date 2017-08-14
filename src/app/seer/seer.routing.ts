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
        { path: 'sys', loadChildren:'./sys/sys.module#SysModule' },
        { path: 'workspace', loadChildren:'./workspace/workspace.module#WorkspaceModule' },
        { path: 'basic', loadChildren:'./basic_info/basic_info.module#BasicInfoModule' },
        { path: 'inventory', loadChildren:'./inventory/inventory.module#InventoryModule' },
        { path: 'analysis', loadChildren:'./analysis/analysis.module#AnalysisModule' },
       /* { path: 'standard', loadChildren:'./standard/standard.module#StandardModule' },*/
        // { path: 'pages', loadChildren: () => System.import('../pages/pages.module') },
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeerRoutingModule {
}

