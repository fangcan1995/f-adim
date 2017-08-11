import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {BaseModalComponent} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../../../theme/components/ng2-bs4-modal/modal";
import {GlobalState} from "../../../../../../../../global.state";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
import {CustomerModel} from "../../../../../../../basic_info/modules/customer-manage/customer-model.class";


/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'shipingcustomer-added-dialog',
  templateUrl: './customer-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
 // providers: [CustomerManageService],
})
export class CustomerDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;


  title: string;

  //customerStore:CustomerStoreModel = new CustomerStoreModel();

  roles = [];
  buttonFlag = true;
  flag: string;

  customersdata = [];
  animation: boolean = true;
  backdrop: string | boolean = true;

  customer:CustomerModel = new CustomerModel();
  constructor(private _state: GlobalState,private _customerService:CustomerManageService,) {
    super();
  }

  ngOnInit(){
    this.title = this.data.title;
    this.flag = this.data.flag;
    this.getCustomerById(this.data.flag);
  }


  getCustomerById(customerId) {
    //alert(customerId);
    this._customerService.getCustomerById(customerId).then((data) => {
      console.log("customerbyId" + data.data);
      this.customer= data.data.buzCustomer;
    });
  }

  SAVEEVENT = 'saveCustomerStore';

  //
  // onSave(): void {
  //
  //   //console.log(this.customerStore);
  //
  //   //alert("On Save");
  //   // this.service.createUser(this.sysUser).then((param) => {
  //   //   this.closeModal();
  //   //   this._state.notify(this.SAVEEVENT, param); //触发新增发放
  //   // });
  //
  //   let parma = {
  //     "data":this.customerStore,
  //     "flag" : this.flag
  //   };
  //
  //   this._state.notify(this.SAVEEVENT, parma); //触发新增发放
  //   this.closeModal();
  // }
  //
  // onEdit(): void {
  //   alert("On Save");
  //   // this.service.updateUser(this.sysUser).then((param) => {
  //   //   this.closeModal();
  //   //   this._state.notify(this.EDITEVENT, param);
  //   // });
  // }

}
