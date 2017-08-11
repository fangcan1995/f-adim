import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  BaBackTop,
  BaCard,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  SeerCard,
  WorkflowComponent,
  TimelineComponent,
  SeerCheckbox
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  ClickOutsideDirective,
  DynamicComponentLoader,
  FormValidatorDirective
} from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe
} from './pipes';

import {
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';

import {
  TreeModule
} from './modules';
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {TreePickerComponent} from "./components/tree-picker/tree-picker.component";
import {TreePickerDirective} from "./components/tree-picker/tree-picker.directive";
import {ChangePasswordComponent} from "./components/baChangePassword/baChangePassword.component";
import {CheckboxPickerComponent} from "./components/checkbox-picker/checkbox-picker.component";
import {CheckboxPickerDirective} from "./components/checkbox-picker/checkbox-picker.directive";

// import {MaterialModule} from "@angular/material";

import { CKEditorModule } from 'ng2-ckeditor';

const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  ChangePasswordComponent,
  BaPictureUploader,
  BaSidebar,
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  SeerCard,
  TreePickerComponent,
  TreePickerDirective,
  WorkflowComponent,
  TimelineComponent,
  SeerCheckbox,
  CheckboxPickerComponent
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur,
  ClickOutsideDirective,
  DynamicComponentLoader,
  FormValidatorDirective,
  CheckboxPickerDirective
];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

const NGA_SUB_MODULES = [
  // MaterialModule,
  Ng2BootstrapModule,
  TreeModule,
  CKEditorModule
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    ...NGA_SUB_MODULES,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
    ...NGA_SUB_MODULES
  ],
  entryComponents: [
    TreePickerComponent,
    ChangePasswordComponent,
    CheckboxPickerComponent
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
