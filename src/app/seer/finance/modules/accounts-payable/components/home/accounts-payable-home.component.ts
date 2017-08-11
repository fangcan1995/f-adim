import {Component} from '@angular/core';
import {BaseService} from "../../../../../base.service";
import {InStorageService} from "../../../../../inventory/modules/reserve-manage/modules/storage-manage/in-storage-manage.service";
import {ExStorageService} from "../../../../../inventory/modules/reserve-manage/modules/storage-manage/ex-storage-manage.service";
import {StorageService} from "../../../../../inventory/modules/reserve-manage/modules/storage-manage/storage-manage.service";

@Component({
  selector: 'purchase-order-home',
  styles: [],
  template: '<in-ex-storage-list [type]="\'in\'" [finance]="true"></in-ex-storage-list>',
  providers: [BaseService,InStorageService,ExStorageService,StorageService],
})
export class AccountsPayableHomeComponent {

  constructor() {
  }
}
