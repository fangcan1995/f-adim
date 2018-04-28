import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'info-publish'},
      {path: 'info-publish', loadChildren: './info-publish/info-publish.module#InfoPublishModule'},
      {path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule'},
      {path: 'subject', loadChildren: './subject/subject.module#SubjectModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
