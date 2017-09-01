import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BusinessComponent } from './business.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      { path: '', redirectTo: 'intention'},
      { path: 'intention', loadChildren:'./intention/intention.module#IntentionModule' },
      { path: 'target', loadChildren:'./target/target.module#TargetModule' },
      { path: 'project', loadChildren:'./project/project.module#ProjectModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
