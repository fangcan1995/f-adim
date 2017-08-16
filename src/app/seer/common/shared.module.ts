import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {dataTableComponent} from "./data_table/data.table";
import {Ng2SmartTableModule} from "ng2-smart-table";

// import { DropdownModule, ModalModule  } from 'ng2-bootstrap';
import { BsDropdownModule, ModalModule  } from 'ngx-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {seerTableComponent} from "./seer_table/seer.table";

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import {selectTableComponent} from "./select_table/select.table";
import {seerListTableComponent} from "./seer_list_table/seer.list.table";
import {MultiPickerComponent} from "./multi-picker/multi-picker.component";
import {MultiPickerDirective} from "./multi-picker/multi-picker.directive";
import {NgaModule} from "../../theme/nga.module";
import {DictSelectDirective} from "./dict-select/dict-select.directive";
import {seerTotalTableComponent} from "./seer_total_table/seer.total.table";
import {DictTranslateDirective} from "./dict-trans/dict-trans.directive";
import {seerListActionTableComponent} from "./seer_list_action_table/seer.list.action.table";

import {seerAlertComponent} from "./seer_alert/seer_alert";

import { CKEditorModule } from 'ng2-ckeditor';
import {seerEditorComponent} from "./seer-editor/seer-editor";
import {seerPrintComponent} from "./seer-print/seer-print";
import {ChartsModule} from "ng2-charts";


import { SeerFilterComponent } from './seer-filter';
import { SeerTableComponent } from './seer-table';
import { SeerFoldingCardComponent } from './seer-folding-card';


@NgModule({
  declarations: [
    dataTableComponent,
    seerTableComponent,
    selectTableComponent,
    seerListTableComponent,
    MultiPickerComponent,
    MultiPickerDirective,
    DictSelectDirective,
    DictTranslateDirective,
    seerTotalTableComponent,
    seerListActionTableComponent,
    seerAlertComponent,
    seerEditorComponent,
    seerPrintComponent,
    
    SeerFilterComponent,
    SeerTableComponent,
    SeerFoldingCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    BsDropdownModule,
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
    dataTableComponent,
    Ng2SmartTableModule,
    BsDropdownModule,
    ModalModule,
    seerTableComponent,
    MultiselectDropdownModule,
    PaginationModule,
    MyDatePickerModule,
    Ng2DatetimePickerModule,
    selectTableComponent,
    seerListTableComponent,
    MultiPickerComponent,
    MultiPickerDirective,
    DictSelectDirective,
    DictTranslateDirective,
    seerTotalTableComponent,
    seerListActionTableComponent,
    seerAlertComponent,
    CKEditorModule,
    seerEditorComponent,
    seerPrintComponent,
    ChartsModule,

    SeerFilterComponent,
    SeerTableComponent,
    SeerFoldingCardComponent,
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
