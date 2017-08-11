import {
  BaseModalComponent,
  DynamicComponentLoader
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";

import {GlobalState} from "../../../../../../global.state";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {CustomerStoreModel} from "../../customer-store-model.class";
import {SaleManListBComponent} from "../saleman/saleman-list.component";

/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'user-added-dialog',
  templateUrl: './customerstore-added-dialog.component.html',
  styleUrls: ['./customerstore-added-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  entryComponents:[SaleManListBComponent]

})
export class CustomerStoreAddedDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;



  title: string;

  customerStore:CustomerStoreModel = new CustomerStoreModel();

  roles = [];
  buttonFlag = true;
  flag: string;

  animation: boolean = true;
  backdrop: string | boolean = true;


  constructor(private _state: GlobalState) {


    super();

    _state.subscribe('getOrgId',(data)=>{
      console.log(data);
      this.customerStore.relatedStaffId = data.id;
      this.customerStore.staffName = data.staffName;
    })
  }

  ngOnInit(){
    this.title = this.data.title;
    this.flag = this.data.flag;
    if (this.flag == '1') {
      console.log(this.data);
      this.customerStore = this.data.user;
      this.buttonFlag = false;
    }
  }


  SAVEEVENT = 'saveCustomerStore';
  EDITEVENT = 'editCustomerStore';

  onSave(): void {

    //console.log(this.customerStore);

    //alert("On Save");
    // this.service.createUser(this.sysUser).then((param) => {
    //   this.closeModal();
    //   this._state.notify(this.SAVEEVENT, param); //触发新增发放
    // });

    let parma = {
      "data":this.customerStore,
      "flag" : this.flag
    };

    this._state.notify(this.SAVEEVENT, parma); //触发新增发放
    this.closeModal();
  }

  onEdit(): void {
    alert("On Save");
    // this.service.updateUser(this.sysUser).then((param) => {
    //   this.closeModal();
    //   this._state.notify(this.EDITEVENT, param);
    // });
  }

  loadOrgList() {
    this.dynamicComponentLoader.loadComponent(SaleManListBComponent);
  }
}
