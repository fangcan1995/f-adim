import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {GlobalState} from "../../../../../../../../global.state";
import {PurchaseContractAccountService} from "../../purchase-contract-account.service";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
/**
 * Created by Administrator on 2017/1/13.
 */
@Component({
  selector: 'purchase-contract-account-operation',
  templateUrl: './purchase-contract-account-operation.component.html',
  providers: [PurchaseContractAccountService, CustomerManageService],
  styleUrls: ['../../purchase-contract-account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchaseContractAccountOperationComponent implements OnInit{

  title = '查询区域';
  SEARCHCONTRACTACCOUNT = 'searchContractAccount';
  customerId: string = ''; //客户名称
  customerStoreId: string = ''; //门店名称
  brandId: string = ''; //品牌名称
  startTime: string = ''; //开始时间
  endTime: string = ''; //结束时间

  customerList = []; //所有客户名称集合
  customerStoreList = []; //客户名称下所有门店名称集合
  brandIdDict = [];

  constructor(private service: PurchaseContractAccountService, private _state: GlobalState,
              private _customerService: CustomerManageService){}

  ngOnInit(): void {
    /*查询所有品牌名称*/
    let param = {};
    this.service.getBrand(param).then((result) => {
      this.brandIdDict = result.data;
    });
    this.getCustomer();
  }

  getCustomer() {
    this._customerService.getCustomer().then((data) => {
      this.customerList = data.data;
    });
  }

  typeChange(customerId) {
    if(customerId != "") {
      this._customerService.getCustomerById(customerId).then((data) => {
        this.customerStoreList = data.data.listStore;
      });
    }else {
      this.customerStoreList = [];
    }
    this.customerId = "";
  }

  /*查询*/
  searchContractAccount() {
    let param = {
      "customerStoreId": this.customerStoreId,
      "brandId": this.brandId,
      "startTime": this.startTime,
      "endTime": this.endTime
    };
    this._state.notify(this.SEARCHCONTRACTACCOUNT, param);
  }

  /*重置*/
  reset() {
    this.customerStoreId ="";
    this.brandId = "";
    this.startTime = "";
    this.endTime = "";
    this.searchContractAccount();
  }

}
