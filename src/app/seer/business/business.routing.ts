import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'intention'},
      { path: 'intention', loadChildren:'./intention/intention.module#IntentionModule' },
      { path: 'target', loadChildren:'./target/target.module#TargetModule' },
      { path: 'project', loadChildren:'./project/project.module#ProjectModule' },
      { path: 'transfer', loadChildren:'./transfer/transfer.module#TransferModule'},
      { path: 'parameter', loadChildren:'./parameter/parameter.module#ParameterModule'},
      { path: 'forms', loadChildren:'./common/common.module#CommonModule'}

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
