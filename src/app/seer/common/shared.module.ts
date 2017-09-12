import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { DropdownModule, ModalModule  } from 'ng2-bootstrap';
import { DataTableModule } from "angular2-datatable";

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { CKEditorModule } from 'ng2-ckeditor';
import { ChartsModule } from "ng2-charts";
import { MultiPickerComponent } from "./multi-picker/multi-picker.component";
import { MultiPickerDirective } from "./multi-picker/multi-picker.directive";

import { NgaModule } from "../../theme/nga.module";

import { DictSelectDirective } from "./dict-select/dict-select.directive";
import { DictTranslateDirective } from "./dict-trans/dict-trans.directive";

import { SeerEditorComponent } from "./seer-editor/seer-editor";
import { SeerPrintComponent } from "./seer-print/seer-print";
import { SeerFilterComponent } from './seer-filter';
import { SeerTableComponent } from './seer-table';
import { SeerSimpleTableComponent } from './seer-simple-table';
import { SeerCollapseCardComponent } from './seer-collapse-card';

// 待干掉
import { seerAlertComponent } from "./seer_alert/seer_alert";
import { seerTableComponent } from "./seer_table/seer.table";

@NgModule({
  declarations: [
    seerTableComponent,
    MultiPickerComponent,
    MultiPickerDirective,
    DictSelectDirective,
    DictTranslateDirective,
    seerAlertComponent,
    SeerEditorComponent,
    SeerPrintComponent,
    
    SeerFilterComponent,
    SeerTableComponent,
    SeerSimpleTableComponent,
    SeerCollapseCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    DropdownModule,
    ModalModule,
    DataTableModule,
    MultiselectDropdownModule,
    PaginationModule,
    MyDatePickerModule,
    Ng2DatetimePickerModule,
    NgaModule,
    CKEditorModule,
    ChartsModule,
  ],
  providers:[

  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Ng2SmartTableModule,
    DropdownModule,
    ModalModule,
    seerTableComponent,
    MultiselectDropdownModule,
    PaginationModule,
    MyDatePickerModule,
    Ng2DatetimePickerModule,
    MultiPickerComponent,
    MultiPickerDirective,
    DictSelectDirective,
    DictTranslateDirective,
    seerAlertComponent,
    CKEditorModule,
    SeerEditorComponent,
    SeerPrintComponent,
    ChartsModule,

    SeerFilterComponent,
    SeerTableComponent,
    SeerSimpleTableComponent,
    SeerCollapseCardComponent,
  ],

  entryComponents:[MultiPickerComponent]
})
export class sharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: sharedModule,
      providers: [

      ],
    };
  }
}
