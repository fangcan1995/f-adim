import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";
import {SeerComponent} from "./seer/seer.component";

export const routes: Routes = [
  // {
  //   path: '', component: AppComponent, children: [
  //     { path: '', redirectTo: 'seer', pathMatch: 'full'},
  //     { path: 'seer', loadChildren: 'app/seer/seer.module#SeerModule'},
  //   ]
  // },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'seer', component: SeerComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
