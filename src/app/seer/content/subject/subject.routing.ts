import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SubjectComponent} from "./subject.component";
import {SubjectEditComponent} from "./components/subject-edit/subject-edit.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SubjectComponent,
      },
      {
        path: 'add',
        component: SubjectEditComponent,
      },
      {
        path: 'edit/:id',
        component: SubjectEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
