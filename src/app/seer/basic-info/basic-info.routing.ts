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
      { path: 'org', loadChildren:'./org/org.module#OrgModule' },
      { path: 'member', loadChildren:'./member/member.module#MemberModule' },
      { path: 'personal-info', loadChildren:'./personal-info/personal-info.module#PersonalInfoModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
