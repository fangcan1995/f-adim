import { Routes, RouterModule }  from '@angular/router';

import {NgModule} from "@angular/core";
import {BasicInfoComponent} from "./basic_info.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BasicInfoComponent,
    children: [
      { path: '', redirectTo: 'contrat-manage'},
      { path: 'staff-manage', loadChildren:'./modules/staff-manage/staff-manage.module' },
      { path: 'org-manage', loadChildren:'./modules/org-manage/org-manage.module' },
      { path: 'member', loadChildren:'./modules/member/member.module#MemberModule' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class basicInfoRouting{

}
