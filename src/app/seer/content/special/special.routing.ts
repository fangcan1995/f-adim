import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SpecialComponent} from "./special.component";
import {SpecialEditComponent} from "./components/special-edit/special-edit.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SpecialComponent,
      },
      {
        path: 'add',
        component: SpecialEditComponent,
      },
      {
        path: 'edit/:id',
        component: SpecialEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
