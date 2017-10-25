import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IntentionComponent } from './intention.component';
import {IntentionCompletionComponent} from "./components/intention-completion/intention-completion.component";

const routes: Routes = [
  {
    path: '',
    children: [
    	{path: '', component: IntentionComponent},
      {path: 'list', component: IntentionComponent},
      {path: 'completion/:id',component: IntentionCompletionComponent,},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
