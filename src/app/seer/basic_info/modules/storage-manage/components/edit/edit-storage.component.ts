import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {StorageManageService} from "../../storage-manage.service";
import {Storage} from "../../../../../model/basic_info/Storage";
import {
  BaseModalComponent,
  DynamicComponentLoader
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GlobalState} from "../../../../../../global.state";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {Supplier} from "../../../../../model/basic_info/supplier";
import {AllocationRepertoryCheckService} from "../../../../../inventory/modules/reserve-manage/modules/warehouse-allocation-manage/allocation-repertory-check.service";
import {BrandTreeComponent} from "../brandTree/brand-tree.component";
import {BrandTreeDto} from "../../../target-manage/BrandTreeDto";

@Component({
  selector: 'edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./style.scss'],
  styles: [
    `.input-group-btn{
      font-size: 14px;
    }`,
    `.input-group-btn > .btn{
        height: 35px;
        margin-left: -1px !important;
    }`],
  encapsulation: ViewEncapsulation.None,
  providers: [AllocationRepertoryCheckService],
  entryComponents:[BrandTreeComponent]

})
export class EditStorageComponent  extends BaseModalComponent implements OnInit{

  /**
   * 1.找到modal组件
   */
  @ViewChild(ModalComponent) modal;

  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  title : string = "新增库房";

  storage : Storage = new Storage();

  parentName : string = "";

  checkAllinput = false;

  constructor(private service?:StorageManageService, private gs?:GlobalState) {
    super();

    gs.subscribe('storageGetBrand',(data)=>{
      if(data.length>0) {
        this.storage.brandName = data[0].name;
        this.storage.storageBrandId = data[0].id;
      }

    });
  }

  ngOnInit() {

    this.storage.parentId = this.data.parentId;
    this.parentName = this.data.parentName;

    if(this.data.currentId != null) {
      this.getStorageById(this.data.currentId);
    }

    this.init(this.modal);
  }

  checkAllInput(){
    this.checkAllinput = true;
  }

  save() {
    this.service.saveStorage(this.storage).then((result) => {
      if(result.success) {
        this.gs.notify("editStorageState",null);
        this.closeModal();
      }
    });
  }

  getStorageById(storageId): void {
    this.service.getStorageById(storageId).then((result) => {
      if(result.success) {
       this.storage = result.data;
      }
    });
  }

  errorMessage: string;


  loadBrandTree() {
    this.dynamicComponentLoader.loadComponent(BrandTreeComponent, {brandId:this.storage.storageBrandId});
  }

}

