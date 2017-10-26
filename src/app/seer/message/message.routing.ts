import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'message'},
      { path: 'message', loadChildren:'./message-manage/message-manage.module#MessageManageModule' },
      { path: 'message-template', loadChildren:'./message-template/message-template.module#MessageTemplateModule' },
      { path: 'message-record', loadChildren:'./message-record/message-record.module#MessageRecordModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
