import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MessageManageComponent } from './message-manage.component';

const routes: Routes = [
  {
    path: '',
    component: MessageManageComponent,
    children: [
      { path: '', redirectTo: 'message'},
      { path: 'message', loadChildren:'./modules/message/message.module#MessageModule' },
      { path: 'message-template', loadChildren:'./modules/message-template/message-template.module#MessageTemplateModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
