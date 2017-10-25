import {
  Routes,
  RouterModule,
} from '@angular/router';
import { DictComponent } from './dict.component';
import { DictEditComponent } from './components/dict-edit/dict-edit.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DictComponent },
      { path: 'add', component: DictEditComponent },
      { path: 'edit/:id', component: DictEditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
