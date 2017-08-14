import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {dataTableComponent} from "./data_table/data.table";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {DropdownModule, ModalModule} from "ng2-bootstrap";
import {DataTableModule} from "angular2-datatable";
import {seerTableComponent} from "./seer_table/seer.table";

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import {supplierPickerComponent} from "./supplierPicker/supplier.picker.component";
import {selectTableComponent} from "./select_table/select.table";
import {seerListTableComponent} from "./seer_list_table/seer.list.table";
import {MultiPickerComponent} from "./multi-picker/multi-picker.component";
import {MultiPickerDirective} from "./multi-picker/multi-picker.directive";
import {NgaModule} from "../../theme/nga.module";
import {DictSelectDirective} from "./dict-select/dict-select.directive";
import {seerTotalTableComponent} from "./seer_total_table/seer.total.table";
import {DictTranslateDirective} from "./dict-trans/dict-trans.directive";
import {seerListActionTableComponent} from "./seer_list_action_table/seer.list.action.table";

import {SaleManListComponent} from "../inventory/modules/delivery-manage/modules/shippinglist-manage/component/saleman/saleman-list.component";
import {InExStorageListComponent} from "../inventory/modules/reserve-manage/modules/storage-manage/components/storageList/storage.list";
import {InExStorageListEditComponent} from "../inventory/modules/reserve-manage/modules/storage-manage/components/storageListEdit/storage.list.edit";
import {GoodsListStorageComponent} from "../inventory/modules/reserve-manage/modules/storage-manage/components/goodsListStorage/goods.list.storage.component";
import {seerAlertComponent} from "./seer_alert/seer_alert";
import {SaveDialogComponent} from "./save-dialog/save-dialog.component";
import {SaveDialogDirective} from "./save-dialog/save-dialog.directive";
import {ProcessHistoryComponent} from "./process/process-history-modal.component";
import {ProcessWorkflowComponent} from "./process/process-workflow.component";
import {brandPickerComponent} from "./brandPicker/brand.picker.component";

import { CKEditorModule } from 'ng2-ckeditor';
import {seerEditorComponent} from "./seer-editor/seer-editor";
import {seerPrintComponent} from "./seer-print/seer-print";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    dataTableComponent,
    seerTableComponent,
    supplierPickerComponent,
    selectTableComponent,
    seerListTableComponent,
    MultiPickerComponent,
    MultiPickerDirective,
    DictSelectDirective,
    DictTranslateDirective,
    seerTotalTableComponent,
    seerListActionTableComponent,
    SaleManListComponent,
    brandPickerComponent,

    InExStorageListComponent,
    InExStorageListEditComponent,
    GoodsListStorageComponent,
    seerAlertComponent,
    SaveDialogComponent,
    SaveDialogDirective,
    ProcessHistoryComponent,
    ProcessWorkflowComponent,
    seerEditorComponent,
    seerPrintComponent,
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
    dataTableComponent,
    Ng2SmartTableModule,
    DropdownModule,
    ModalModule,
    seerTableComponent,
    MultiselectDropdownModule,
    PaginationModule,
    MyDatePickerModule,
    Ng2DatetimePickerModule,
    supplierPickerComponent,
    selectTableComponent,
    seerListTableComponent,
    MultiPickerComponent,
    MultiPickerDirective,
    DictSelectDirective,
    DictTranslateDirective,
    seerTotalTableComponent,
    seerListActionTableComponent,
    brandPickerComponent,

    InExStorageListComponent,
    InExStorageListEditComponent,
    GoodsListStorageComponent,
    seerAlertComponent,
    SaveDialogComponent,
    SaveDialogDirective,
    ProcessHistoryComponent,
    ProcessWorkflowComponent,
    CKEditorModule,
    seerEditorComponent,
    seerPrintComponent,
    ChartsModule,
  ],

  entryComponents:[MultiPickerComponent,SaveDialogComponent]
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
