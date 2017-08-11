import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {BaseModalComponent} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../../../theme/components/ng2-bs4-modal/modal";
import {CustomerStoreModel} from "../../../../../../../basic_info/modules/customer-manage/customer-store-model.class";
import {GlobalState} from "../../../../../../../../global.state";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";


/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'shippingustomerstore-added-dialog',
  templateUrl: './customerstore-added-dialog.component.html',
  encapsulation: ViewEncapsulation.None,

})
export class CustomerStoreDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;


  title: string;

  customerStore:CustomerStoreModel = new CustomerStoreModel();

  roles = [];
  buttonFlag = true;
  flag: string;

  animation: boolean = true;
  backdrop: string | boolean = true;


  constructor(private _state: GlobalState,private _customerService:CustomerManageService,) {
    super();
  }

  ngOnInit(){
    this.title = this.data.title;
    this.getCustomerStoreById(this.data.customerId,this.data.flag);
  }

  getCustomerStoreById(customerId,storeId) {
    //alert(storeId);
    /*字典查询商品系列*/
    this._customerService.getCustomerById(customerId).then((result) => {
      this.customerStore = result.data.listStore.filter( d =>d.id==storeId)[0];
      console.log(this.customerStore);
    });

  }

  SAVEEVENT = 'saveCustomerStore';


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

}
