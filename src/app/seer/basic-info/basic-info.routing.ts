import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'staff-manage'},
      { path: 'staff-manage', loadChildren:'./staff/staff.module#StaffModule' },
      { path: 'org-manage', loadChildren:'./org-manage/org-manage.module' },
      { path: 'member', loadChildren:'./member/member.module#MemberModule' },
      { path: 'message', loadChildren:'./message/message.module#MessageModule' },
      { path: 'message-template', loadChildren:'./message-template/message-template.module#MessageTemplateModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
