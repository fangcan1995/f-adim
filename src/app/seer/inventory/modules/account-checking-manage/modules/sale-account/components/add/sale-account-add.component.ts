import {OnInit, ViewEncapsulation, Component} from "@angular/core";
import {Location} from '@angular/common';
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalState} from "../../../../../../../../global.state";
import {SaleAccountService} from "../../sale-account.service";
import {ContractAccount} from "../../../../../../../model/inventory/contractAccount";
import {SaleOrder} from "../../../../../../../model/inventory/saleOrder";
import {ActingMatBudget} from "../../../../../../../model/inventory/actingMatBudget";
import {SALE_DICT_DATA} from "../dictData";
/**
 * Created by Administrator on 2017/2/20.
 */
@Component({
  selector: 'sale-account-add',
  templateUrl: './sale-account-add.component.html',
  providers: [SaleAccountService, CustomerManageService],
  styleUrls: ['../../sale-account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleAccountAddComponent implements OnInit{

  title = "新建销售对账单";
  saleAccountId: string; //销售对账单ID
  addFlag: boolean;
  buttonFlag: boolean = true;

  translate = {};

  saleAccount: ContractAccount = new ContractAccount();

  checkAllInput = false;

  orderTotalAmount:number = 0;
  costTotalAmount:number = 0;
  reconcicliationTotalAmount:number = 0;

  /*采购订单列表*/
  orderSelectSource:SaleOrder[] = [];
  orderSelectTitle = [
    {key:'soNum', label:'订单编号'},
    {key:'storeName', label:'门店名称'},
    {key:'soType', label:'订单类型'},
    {key:'soTotalAmount', label:'订单金额(元)'}
  ];
  orderSource:SaleOrder[] = [];
  orderTitles = [
    {key:'soNum', label:'订单编号'},
    {key:'storeName', label:'门店名称'},
    {key:'soTypeName', label:'订单类型'},
    {key:'soTotalAmount', label:'订单金额(元)'}
  ];

  /*费用列表*/
  costSelectSource:ActingMatBudget[] = [];
  costSelectTitle = [
    {key:'budgetName', label:'费用名称'},
    {key:'customerStoreName', label:'门店名称'},
    {key:'budgetSubject', label:'费用科目'},
    {key:'budgetAmount', label:'费用金额(元)'}
  ];
  costSource:ActingMatBudget[] = [];
  costTitles = [
    {key:'budgetName', label:'费用名称'},
    {key:'customerStoreName', label:'门店名称'},
    {key:'budgetSubjectName', label:'费用科目'},
    {key:'budgetAmount', label:'费用金额(元)'}
  ];

  cachedSelectedOrderIds = new Set();
  cachedSelectedCostIds = new Set();

  supplierId: string = '' //供应商ID
  brandIdDict = [];
  supplierIdDict = [];
  customerId: string = ''; //客户名称ID
  customerList = []; //所有客户名称集合
  customerStoreList = []; //客户名称下所有门店名称集合

  reconciliationNum = 'DZ' + new Date().getTime();

  soTypeDict = [];
  budgetSubjectDict = [];

  constructor(private location: Location, private _activatedRoute: ActivatedRoute, private service: SaleAccountService,
              private _state: GlobalState, private _router: Router, private _customerService: CustomerManageService){

  }

  ngOnInit() {
    /*查询所有供应商名称*/
    this.service.getSupplier().then((result) => {
      this.supplierIdDict = result.data;
    });
    /*字典查询订单类型*/
    this.service.getDictByKey("SO_TYPE").then((result) => {
      this.soTypeDict = result.data;
    });
    /*字典查询科目费用*/
    this.service.getDictByKey("BUDGET_SUBJECT").then((result) => {
      this.budgetSubjectDict = result.data;
    });
    this._activatedRoute.params.subscribe((params) => {
      this.saleAccountId = params['id'];
      this.addFlag = !this.saleAccountId;
      if (!this.addFlag) {
        this.title = "修改销售对账单";
      }
    });

    if (!this.addFlag) {
      this.getSaleAccountById(this.saleAccountId);
      this.buttonFlag = false;
    } else {
      this.saleAccount.reconciliationNum = this.reconciliationNum;
    }
    this.translate = SALE_DICT_DATA;
    this.getCustomer();
  }

  /*返回信息列表*/
  cancel(): void {
    this.checkAllInput = false;
    this.location.back();
  }

  /*查询对账单信息*/
  getSaleAccountById(saleAccountId: string) {
    this.service.getSaleAccountById(saleAccountId).then((result) => {
      this.saleAccount = result.data;
      this.orderSource = result.data.saleOrderVOs;
      let soTypeDict = this.soTypeDict;
      this.orderSource.map(order => {
        soTypeDict.map(soType => {
          if (order.soType == soType.dictValueId) {
            order.soTypeName = soType.dictValueName;
          }
        });
      });
      this.costSource = result.data.costVOs;
      let budgetSubjectDict = this.budgetSubjectDict;
      this.costSource.map(cost => {
        budgetSubjectDict.map(budgetSubject => {
          if (cost.budgetSubject == budgetSubject.dictValueId) {
            cost.budgetSubjectName = budgetSubject.dictValueName;
          }
        });
      });
      this.orderTotalAmount = result.data.orderAmount;
      this.costTotalAmount = result.data.costAmount;
      this.reconcicliationTotalAmount = result.data.reconcicliationAmount;
      this.supplierId = result.data.supplierId;
      this.customerId = result.data.customerId;
      this.supplierChange(this.supplierId);
      this.typeChange(this.customerId);
      this.orderAndCostInfo(result.data.customerStoreId);
      let reconciliationOrderList = [];
      result.data.saleOrderVOs.map(data => {
        reconciliationOrderList.push(data.id);
      });
      let reconciliationCostList = [];
      result.data.costVOs.map(data => {
        reconciliationCostList.push(data.id);
      });
      this.saleAccount.reconciliationOrderList = reconciliationOrderList;
      this.saleAccount.reconciliationCostList = reconciliationCostList;
    });
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
    // this.customerId = "";
  }

  supplierChange(supplierId) {
    if(supplierId != "") {
      let param = {
        "supplierId": supplierId
      };
      this.service.getBrand(param).then((data) => {
        this.brandIdDict = data.data;
      });
    }else {
      this.brandIdDict = [];
    }
  }

  orderAndCostInfo(customerStoreId) {
    this.service.getSaleOrders(customerStoreId).then((data) => {
      this.orderSelectSource = data.data;
      // console.log(this.orderSelectSource);
      this.orderSelectSource.map(order => {
        this.soTypeDict.map(soType => {
          if (order.soType == soType.dictValueId) {
            order.soTypeName = soType.dictValueName;
          }
        });
      });
    });
    this.service.getActingMatBudget(customerStoreId).then((data) => {
      // console.log(data.data);
      this.costSelectSource = data.data;
      this.costSelectSource.map(cost => {
        this.budgetSubjectDict.map(budgetSubject => {
          if (cost.budgetSubject == budgetSubject.dictValueId) {
            cost.budgetSubjectName = budgetSubject.dictValueName;
          }
        });
      });
    });
  }

  /**
   * 订单选择事件
   */
  onMultiPickerNotifyOrder($event){
    this.orderTotalAmount = 0;
    if($event.type == 'select_item'){
      this.orderSource = $event.data;
      //重置已选商品id
      this.cachedSelectedOrderIds.clear();
      this.saleAccount.reconciliationOrderList.splice(0, this.saleAccount.reconciliationOrderList.length);
      this.orderSource.map(data => {
        // data.goodsId = data.id;
        if (data.soType == '00') {
          this.orderTotalAmount = this.orderTotalAmount + parseFloat(data.soTotalAmount);
        } else {
          this.orderTotalAmount = this.orderTotalAmount - parseFloat(data.soTotalAmount);
        }
        this.cachedSelectedOrderIds.add(data.id);
        this.saleAccount.reconciliationOrderList.push(data.id);
      });
      //初始化所有商品
      this.orderSelectSource.map(data => {
        if(this.cachedSelectedOrderIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
      this.reconcicliationTotalAmountCount(this.orderTotalAmount, this.costTotalAmount);
    }
    if($event.type == 'clear_all'){
      this.orderSource = [];
      //重置已选商品id
      this.cachedSelectedOrderIds.clear();
      //初始化所有商品
      this.orderSelectSource.map(data => {
        delete data['selected'];
      });
    }
  }

  /**
   * 费用选择事件
   */
  onMultiPickerNotifyCost($event){
    this.costTotalAmount = 0;
    if($event.type == 'select_item'){
      this.costSource = $event.data;
      //重置已选商品id
      this.cachedSelectedCostIds.clear();
      this.saleAccount.reconciliationCostList.splice(0, this.saleAccount.reconciliationCostList.length);
      this.costSource.map(data => {
        // data.goodsId = data.id;
        this.costTotalAmount = this.costTotalAmount + parseFloat(data.budgetAmount);
        this.cachedSelectedCostIds.add(data.id);
        this.saleAccount.reconciliationCostList.push(data.id);
      });
      //初始化所有商品
      this.costSelectSource.map(data => {
        if(this.cachedSelectedCostIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
      this.reconcicliationTotalAmountCount(this.orderTotalAmount, this.costTotalAmount);
    }
    if($event.type == 'clear_all'){
      this.costSource = [];
      //重置已选商品id
      this.cachedSelectedCostIds.clear();
      //初始化所有商品
      this.costSelectSource.map(data => {
        delete data['selected'];
      });
    }
  }

  reconcicliationTotalAmountCount(orderTotalAmount:number, costTotalAmount:number) {
    this.reconcicliationTotalAmount = orderTotalAmount - costTotalAmount;
  }

  /*表单提交方法*/
  submitForm() {
    if(!this.buttonFlag){
      this.updateSaleAccount();
    }else{
      this.saveSaleAccount();
    }
  }

  allInput(){
    this.checkAllInput = true;
  }

  saveSaleAccount():void {
    this.saleAccount.orderAmount = this.orderTotalAmount;
    this.saleAccount.costAmount = this.costTotalAmount;
    this.saleAccount.reconcicliationAmount = this.reconcicliationTotalAmount;
    this.saleAccount.reconcicliationType = "02";
    this.service.createSaleAccount(this.saleAccount).then((result) => {
      if(result.success) {
        this.location.back();
      }
      this.checkAllInput = false;
    });
  }

  updateSaleAccount():void {
    this.saleAccount.orderAmount = this.orderTotalAmount;
    this.saleAccount.costAmount = this.costTotalAmount;
    this.saleAccount.reconcicliationAmount = this.reconcicliationTotalAmount;
    this.service.updateSaleAccount(this.saleAccount).then((result) => {
      if(result.success) {
        this.location.back();
      }
      this.checkAllInput = false;
    });
  }

}
