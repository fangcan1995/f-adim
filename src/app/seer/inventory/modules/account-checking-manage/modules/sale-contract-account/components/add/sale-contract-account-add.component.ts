import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {SaleContractAccountService} from "../../sale-contract-account.service";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
import {ContractAccount} from "../../../../../../../model/inventory/contractAccount";
import {SaleOrder} from "../../../../../../../model/inventory/saleOrder";
import {Contract} from "../../../../../../../model/basic_info/contract";
import {GlobalState} from "../../../../../../../../global.state";
/**
 * Created by Administrator on 2017/3/1.
 */
@Component({
  selector: 'sale-contract-account-add',
  templateUrl: './sale-contract-account-add.component.html',
  providers: [SaleContractAccountService, CustomerManageService],
  styleUrls: ['../../sale-contract-account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleContractAccountAddComponent implements OnInit{

  title = "新建合同对账单";
  orderTitle = "提取销售订单";
  contractTitle = "提取合同";
  contractAccountId: string; //销售订单ID
  addFlag: boolean;
  buttonFlag: boolean = true;

  translate = {};

  contractAccount: ContractAccount = new ContractAccount();

  checkAllInput = false;

  orderTotalAmount:number = 0;
  contractTotalRebate:number = 0;
  contractRebateMoney:number = 0;

  /*采购订单列表*/
  orderSelectSource:SaleOrder[] = [];
  orderSelectTitle = [
    {key:'soNum', label:'订单编号'},
    {key:'storeName', label:'门店名称'},
    {key:'poType', label:'订单类型'},
    {key:'soTotalAmount', label:'订单金额(元)'}
  ];
  orderSource:SaleOrder[] = [];
  orderTitles = [
    {key:'soNum', label:'订单编号'},
    {key:'storeName', label:'门店名称'},
    {key:'dictValueName', label:'订单类型'},
    {key:'soTotalAmount', label:'订单金额(元)'}
  ];

  /*合同列表*/
  contractSelectSource:Contract[] = [];
  contractSelectTitle = [
    {key:'contractNumber', label:'合同编号'},
    {key:'contractName', label:'合同名称'},
    {key:'contractType', label:'合同分类'},
    {key:'signDate', label:'合同时间'}
  ];
  contractSource:Contract[] = [];
  contractTitles = [
    {key:'contractNumber', label:'合同编号'},
    {key:'contractName', label:'合同名称'},
    {key:'contractTypeName', label:'合同分类'},
    {key:'signDate', label:'合同时间'}
  ];

  cachedSelectedOrderIds = new Set();
  cachedSelectedContractIds = new Set();

  supplierId: string = '' //供应商ID
  brandIdDict = [];
  supplierIdDict = [];
  customerId: string = ''; //客户名称ID
  customerList = []; //所有客户名称集合
  customerStoreList = []; //客户名称下所有门店名称集合

  reconciliationNum = 'DZ' + new Date().getTime();

  contractTypeDict = [];
  soTypeDict = [];

  constructor(private location: Location, private _activatedRoute: ActivatedRoute, private service: SaleContractAccountService,
              private _state: GlobalState, private _router: Router, private _customerService: CustomerManageService){

  }

  ngOnInit() {
    /*查询所有供应商名称*/
    this.service.getSupplier().then((result) => {
      this.supplierIdDict = result.data;
    });
    /*字典查询合同类型*/
    this.service.getDictByKey("SO_TYPE").then((result) => {
      this.soTypeDict = result.data;
    });
    /*字典查询合同类型*/
    this.service.getDictByKey("CONTRACT_TYPE").then((result) => {
      this.contractTypeDict = result.data;
    });
    this._activatedRoute.params.subscribe((params) => {
      this.contractAccountId = params['id'];
      this.addFlag = !this.contractAccountId;
      if (!this.addFlag) {
        this.title = "修改合同对账单";
      }
    });

    if (!this.addFlag) {
      this.getContractAccountById(this.contractAccountId);
      this.buttonFlag = false;
    } else {
      this.contractAccount.reconciliationNum = this.reconciliationNum;
    }
    // this.translate = CONTRACT_DICT_DATA;
    this.getCustomer();
  }

  /*返回信息列表*/
  cancel(): void {
    this.checkAllInput = false;
    this.location.back();
  }

  /*查询对账单信息*/
  getContractAccountById(contractAccountId: string) {
    this.service.getContractAccountById(contractAccountId).then((result) => {
      this.contractAccount = result.data;
      this.orderSource = result.data.saleOrderVOs;
      let soTypeDict = this.soTypeDict;
      this.orderSource.map(order => {
        soTypeDict.map(soType => {
          if (order.soType == soType.dictValueId) {
            order.dictValueName = soType.dictValueName;
          }
        });
      });
      this.contractSource = result.data.contractVOs;
      let contractTypeDict = this.contractTypeDict;
      this.contractSource.map(contract => {
        contractTypeDict.map(contractType => {
          if (contract.contractType == contractType.dictValueId) {
            contract.contractTypeName = contractType.dictValueName;
          }
        });
      });
      this.orderTotalAmount = result.data.orderAmount;
      this.contractTotalRebate = result.data.contractRebate;
      this.contractRebateMoney = result.data.reconcicliationAmount;
      this.supplierId = result.data.supplierId;
      this.customerId = result.data.customerId;
      this.supplierChange(this.supplierId);
      this.typeChange(this.customerId);
      let reconciliationOrderList = [];
      result.data.saleOrderVOs.map(data => {
        reconciliationOrderList.push(data.id);
      });
      let reconciliationContractList = [];
      result.data.contractVOs.map(data => {
        reconciliationContractList.push(data.id);
      });
      this.contractAccount.reconciliationOrderList = reconciliationOrderList;
      this.contractAccount.reconciliationContractList = reconciliationContractList;
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
      let paramData = {secondParty: customerId, contractType: "01"};
      this.service.getContractsByTypeAndSupplier(paramData).subscribe(data => {
        // console.log(data.data);
        this.contractSelectSource = data.data;
        this.contractSelectSource.map(contract => {
          this.contractTypeDict.map(contractType => {
            if (contract.contractType == contractType.dictValueId) {
              contract.contractTypeName = contractType.dictValueName;
            }
          });
        });
      });
    }else {
      this.customerStoreList = [];
    }
    // this.customerId = "";
  }

  customerStoreChange(customerStoreId) {
    if(customerStoreId != "") {
      this.service.getSaleOrders(customerStoreId).then((data) => {
        this.orderSelectSource = data.data;
        // console.log(this.orderSelectSource);
      });
    }
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

  /**
   * 订单选择事件
   */
  onMultiPickerNotifyOrder($event){
    this.orderTotalAmount = 0;
    if($event.type == 'select_item'){
      this.orderSource = $event.data;
      //重置已选商品id
      this.cachedSelectedOrderIds.clear();
      this.contractAccount.reconciliationOrderList.splice(0, this.contractAccount.reconciliationOrderList.length);
      this.orderSource.map(data => {
        // data.goodsId = data.id;
        if (data.soType == '00') {
          this.orderTotalAmount = this.orderTotalAmount + parseFloat(data.soTotalAmount);
        } else {
          this.orderTotalAmount = this.orderTotalAmount - parseFloat(data.soTotalAmount);
        }
        this.cachedSelectedOrderIds.add(data.id);
        this.contractAccount.reconciliationOrderList.push(data.id);
      });
      //初始化所有商品
      this.orderSelectSource.map(data => {
        if(this.cachedSelectedOrderIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
      this.contractRebateCount(this.orderTotalAmount, this.contractTotalRebate);
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
   * 合同选择事件
   */
  onMultiPickerNotifyContract($event){
    this.contractTotalRebate = 0;
    if($event.type == 'select_item'){
      this.contractSource = $event.data;
      //重置已选商品id
      this.cachedSelectedContractIds.clear();
      this.contractAccount.reconciliationContractList.splice(0, this.contractAccount.reconciliationContractList.length);
      this.contractSource.map(data => {
        // data.goodsId = data.id;
        this.service.getContractBrand(data.id).subscribe(brands => {
          brands.data.map(brand => {
            this.service.getRebateByBrandId(brand.id).subscribe(rebates => {
              rebates.data.map(rebate => {
                this.contractTotalRebate = this.contractTotalRebate + parseFloat(rebate.rebateTarget);
              });
              this.contractRebateCount(this.orderTotalAmount, this.contractTotalRebate);
            });
          });
        });
        this.cachedSelectedContractIds.add(data.id);
        this.contractAccount.reconciliationContractList.push(data.id);
      });
      //初始化所有商品
      this.contractSelectSource.map(data => {
        if(this.cachedSelectedContractIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
    }
    if($event.type == 'clear_all'){
      this.contractSource = [];
      //重置已选商品id
      this.cachedSelectedContractIds.clear();
      //初始化所有商品
      this.contractSelectSource.map(data => {
        delete data['selected'];
      });
    }
  }

  contractRebateCount(orderTotalAmount:number, contractTotalRebate:number) {
    this.contractRebateMoney = orderTotalAmount/100 * contractTotalRebate;
  }

  /*表单提交方法*/
  submitForm() {
    if(!this.buttonFlag){
      this.updateContractAccount();
    }else{
      this.saveContractAccount();
    }
  }

  allInput(){
    this.checkAllInput = true;
  }

  saveContractAccount():void {
    this.contractAccount.orderAmount = this.orderTotalAmount;
    this.contractAccount.contractRebate = this.contractTotalRebate;
    this.contractAccount.reconcicliationAmount = this.contractRebateMoney;
    this.contractAccount.reconcicliationType = "01";
    this.service.createContractAccount(this.contractAccount).then((result) => {
      if(result.success) {
        this.location.back();
      }
      this.checkAllInput = false;
    });
  }

  updateContractAccount():void {
    this.contractAccount.orderAmount = this.orderTotalAmount;
    this.contractAccount.contractRebate = this.contractTotalRebate;
    this.contractAccount.reconcicliationAmount = this.contractRebateMoney;
    this.service.updateContractAccount(this.contractAccount).then((result) => {
      if(result.success) {
        this.location.back();
      }
      this.checkAllInput = false;
    });
  }

}
