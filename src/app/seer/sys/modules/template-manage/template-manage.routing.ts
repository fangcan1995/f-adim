import { Routes, RouterModule }  from '@angular/router';
import {TemplateManageComponent} from "./template-manage.component";
import {TemplateListComponent} from "./components/template-list/template-list.component";
import {EditTemplateComponent} from "./components/edit-template/edit-template.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TemplateManageComponent,
    children: [
      { path: '', component: TemplateListComponent},
      { path: 'edit', component: EditTemplateComponent},
      { path: 'edit/:id', component: EditTemplateComponent},
    ]
  }
];

export const PrintManageRouting = RouterModule.forChild(routes);
