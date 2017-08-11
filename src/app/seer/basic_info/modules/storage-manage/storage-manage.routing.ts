import { Routes, RouterModule }  from '@angular/router';
import {StorageManageComponent} from "./storage-manage.component";
import {StorageListComponent} from "./components/list/storage-list.component";
import {EditStorageComponent} from "./components/edit/edit-storage.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: StorageManageComponent,
    children: [
      { path: '', component: StorageListComponent},
      { path: 'edit',component :EditStorageComponent },
      { path: 'edit/:id',component :EditStorageComponent }
    ]
  }
];

export const storageManageRouting = RouterModule.forChild(routes);
