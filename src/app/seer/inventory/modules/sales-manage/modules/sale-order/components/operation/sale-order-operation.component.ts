import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {GlobalState} from "../../../../../../../../global.state";
import {SaleOrderService} from "../../sale-order.service";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
/**
 * Created by Administrator on 2017/1/13.
 */
@Component({
  selector: 'sale-order-operation',
  templateUrl: './sale-order-operation.component.html',
  providers: [SaleOrderService, CustomerManageService],
  styleUrls: ['../../sale-order.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleOrderOperationComponent implements OnInit{
  title = '查询区域';
  UPDATESALEORDERLIST = 'updateSaleOrderList';
  soCategory: string = ''; //销售分类
  customerId: string = ''; //客户名称
  customerStoreId: string = ''; //门店名称
  staffId: string = ''; //销售人员
  startTime: string = ''; //开始时间
  endTime: string = ''; //结束时间
  soState: string = ''; //订单状态

  staffName: string;

  soCategoryDict = [];
  soStateDict = [];

  customerList = []; //所有客户名称集合
  customerStoreList = []; //客户名称下所有门店名称集合

  staffs = [];

  /** 订单类型 */
  soType = '00';

  constructor(private service: SaleOrderService, private _state: GlobalState, private _customerService: CustomerManageService){}

  ngOnInit(): void {
    /*字典查询销售分类*/
    this.service.getDictByKey("SO_CATEGORY").then((result) => {
      this.soCategoryDict = result.data;
    });
    /*字典查询销售订单状态*/
    this.service.getDictByKey("SO_STATE").then((result) => {
      this.soStateDict = result.data;
    });
    /*我方人员树结构初始化*/
    this.service.getStaffsWithOrgs().then(result=>{
      if (result.success){
        result.data.map(res=>{
          if (res.customNodeType=='org'){
            res['customIcon'] = 'fa fa-sitemap';
          }
          if (res.customNodeType=='staff'){
            res['customIcon'] = 'ion-person';
          }
        });
        this.staffs = jsonTree(result.data);
      }else {
        alert(result.message);
      }
    })
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

  /**
   * 树选择事件
   */
  onTreePickerNotify($event){
    if($event.eventName == "onSelectCompleted"){
      if($event.data.length > 0) {
        this.staffId = $event.data[0].id;
        this.staffName = $event.data[0].data.name;
      }else {
        this.staffId = undefined;
        this.staffName = undefined;
      }
    }
  }

  /*查询*/
  searchSaleOrder() {
    let param = {
      "soCategory": this.soCategory,
      "customerStoreId": this.customerStoreId,
      "staffId": this.staffId,
      "startTime": this.startTime,
      "endTime": this.endTime,
      "soState": this.soState,
      "soType": this.soType
    };
    this._state.notify(this.UPDATESALEORDERLIST, param);
  }

  reset() {
    this.soCategory = "";
    this.customerStoreId ="";
    this.staffName = "";
    this.staffId = "";
    this.startTime = "";
    this.endTime = "";
    this.soState = "";
    this.searchSaleOrder();
  }

}
