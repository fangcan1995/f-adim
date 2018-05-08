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
      { path: 'subject', loadChildren:'./subject/subject.module#SubjectModule' },
      { path: 'project', loadChildren:'./project/project.module#ProjectModule' },
      { path: 'transfer', loadChildren:'./transfer/transfer.module#TransferModule'},
      { path: 'parameter', loadChildren:'./parameter/parameter.module#ParameterModule'},
      { path: 'common', loadChildren:'./common/common.module#CommonModule'},
      { path: 'forms', loadChildren:'./forms/forms.module#FormsModule'}

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
