import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BasicInfoComponent } from "./basic-info.component";

const routes: Routes = [
  {
    path: '',
    component: BasicInfoComponent,
    children: [
      { path: '', redirectTo: 'contrat-manage'},
      { path: 'staff-manage', loadChildren:'./staff-manage/staff-manage.module' },
      { path: 'org-manage', loadChildren:'./org-manage/org-manage.module' },
      { path: 'member', loadChildren:'./member/member.module#MemberModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
