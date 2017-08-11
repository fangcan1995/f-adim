import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppState, InternalStateType} from "./app.service";
import {GlobalState} from "./global.state";
import {NgaModule} from "./theme/nga.module";
import {AppRoutingModule} from "./app.routing.module";
import {SeerModule} from "./seer/seer.module";
import {LoginModule} from "./seer/login/login.module";
import {CriteriaModule} from "./criteria/criteria.module";

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgaModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SeerModule,
    LoginModule,
    CriteriaModule
  ],
  providers: [
    ...APP_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appState: AppState) {
  }
}
