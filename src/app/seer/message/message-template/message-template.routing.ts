import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { MessageTemplateComponent } from "./message-template.component";
import { MessageTemplateEditComponent } from './components/message-template-edit/message-template-edit.component';
import { MessageTemplateDetailComponent} from "./components/message-template-detail/message-template-detail.component"
const routes: Routes = [
  {
    path: '',
    children: [
    	{path: '', component: MessageTemplateComponent,},
    	{path: 'add', component: MessageTemplateEditComponent,},
    	{path: 'edit/:id', component: MessageTemplateEditComponent,},
      {path: 'detail/:id', component: MessageTemplateDetailComponent},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
