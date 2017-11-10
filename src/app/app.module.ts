import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppState, InternalStateType } from "./app.service";
import { GlobalState } from "./global.state";
import { NgaModule } from "./theme/nga.module";
import { AppRoutingModule } from "./app.routing.module";
import { SeerModule } from "./seer/seer.module";
import { LoginModule } from "./seer/login/login.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { AccordionModule,AlertModule,ButtonsModule,ModalModule,TabsModule } from 'ngx-bootstrap';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    SeerModule,
    CKEditorModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
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
