import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AnnouncementComponent} from "./announcement.component";
import {AnnouncementEditComponent} from "./components/announcement-edit/announcement-edit.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AnnouncementComponent,
      },
      {
        path: 'add',
        component: AnnouncementEditComponent,
      },
      {
        path: 'edit/:id',
        component: AnnouncementEditComponent,
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
