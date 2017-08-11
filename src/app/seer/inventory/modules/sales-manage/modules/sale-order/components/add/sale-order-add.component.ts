import {Component, OnInit, ViewEncapsulation, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {GlobalState} from "../../../../../../../../global.state";
import {SaleOrderService} from "../../sale-order.service";
import {SaleOrder} from "../../../../../../../model/inventory/saleOrder";
import {SaleGoods} from "../../../../../../../model/inventory/saleGoods";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
import {Goods} from "../../../../../../../model/basic_info/goods";
import {BrandManageService} from "../../../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {seerTotalTableComponent} from "../../../../../../../common/seer_total_table/seer.total.table";
import * as _ from 'lodash';
/**
 * Created by Administrator on 2017/1/13.
 */
@Component({
  selector: 'sale-order-add',
  templateUrl: './sale-order-add.component.html',
  providers: [SaleOrderService, CustomerManageService, BrandManageService],
  styleUrls: ['../../sale-order.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleOrderAddComponent implements OnInit{

  @ViewChild('selectedGoodsTable') seerTable:seerTotalTableComponent;
  @ViewChild('selectedGoodsGiftTable') seerGiftTable:seerTotalTableComponent;
  @ViewChild('selectedGoodsMaterialTable') seerMaterialTable:seerTotalTableComponent;

  title = "新建销售订单";
  saleOrderId: string; //销售订单ID
  addFlag: boolean;
  buttonFlag: boolean = true;

  checkAllInput = false;

  saleOrder: SaleOrder = new SaleOrder();

  /*商品列表*/
  goods:Goods[] = [];
  goodsTitle = [
    {key:'brandName',label:'品牌'},
    {key:'goodsName',label:'商品名称'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'},
    {key:'goodsPrice',label:'合同单价'},
  ];
  selectedGoods:SaleGoods[] = [];
  selectedGoodsTitle = [
    {key:'goodsName',label:'商品名称'},
    {key:'brandName',label:'品牌'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'},
    {key:'goodsPrice',label:'合同单价(元)'},
    {key:'goodsNum',label:'库存'},
    {key:'saleDiscount',label:'折扣(%)', type:'number_input'},
    {key:'saleUnitPrice',label:'实际单价(元)', type:'number_input'},
    {key:'saleQuantity',label:'销售数量(个)', type:'number_input', total:true},
    {key:'contractTotalAmount',label:'合同金额(元)', total:true},
    {key:'saleTotalAmount',label:'实际金额(元)', total:true},
  ];
  /*赠品列表*/
  giftGoods:Goods[] = [];
  giftGoodsTitle = [
    {key:'brandName',label:'品牌'},
    {key:'goodsName',label:'商品名称'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'}
  ];
  selectedGiftGoods:SaleGoods[] = [];
  selectedGiftGoodsTitle = [
    {key:'goodsName',label:'商品名称'},
    {key:'brandName',label:'品牌'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'},
    {key:'saleQuantity',label:'销售数量(个)', type:'number_input', total:true},
  ];
  /*物料列表*/
  materialGoods:Goods[] = [];
  materialGoodsTitle = [
    {key:'brandName',label:'品牌'},
    {key:'goodsName',label:'商品名称'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'}
  ];
  selectedMaterialGoods:SaleGoods[] = [];
  selectedMaterialGoodsTitle = [
    {key:'goodsName',label:'商品名称'},
    {key:'brandName',label:'品牌'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'},
    {key:'saleQuantity',label:'销售数量(个)', type:'number_input', total:true},
  ];

  cachedSelectedGoodsIds = new Set();
  cachedSelectedGiftGoodsIds = new Set();
  cachedSelectedMaterialGoodsIds = new Set();

  staffs = [];

  soCategoryDict = [];
  curTypeDict = [];
  invoiceReceiptDict = [];
  receiptMethodDict = [];
  shippingMethodDict = [];

  customerId: string = '';

  customerList = []; //所有客户名称集合
  customerStoreList = []; //客户名称下所有门店名称集合

  staffName;

  /** 订单类型 */
  soType = '00';
  /** 订单来源 */
  soSource = '00';
  /** 订单状态 */
  soState = '00';

  soNum = 'XS' + new Date().getTime();

  constructor(private location: Location, private _activatedRoute: ActivatedRoute, private service: SaleOrderService,
              private _state: GlobalState, private _router: Router, private _customerService: CustomerManageService){

  }

  ngOnInit() {
    /*字典查询销售分类*/
    this.service.getDictByKey("SO_CATEGORY").then((result) => {
      this.soCategoryDict = result.data;
    });
    /*字典查询币种*/
    this.service.getDictByKey("CUR_TYPE").then((result) => {
      this.curTypeDict = result.data;
    });
    /*字典查询开具发票*/
    this.service.getDictByKey("INVOICE_RECEIPT").then((result) => {
      this.invoiceReceiptDict = result.data;
    });
    /*字典查询收款方式*/
    this.service.getDictByKey("RECEIPT_METHOD").then((result) => {
      this.receiptMethodDict = result.data;
    });
    /*字典查询配送方式*/
    this.service.getDictByKey("SHIPPING_METHOD").then((result) => {
      this.shippingMethodDict = result.data;
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
    this.getCustomer(); //查询所有客户

    this.getSaleGoodsGift(); //查询所有赠品
    this.getSaleGoodsMaterial(); //查询所有物料

    this._activatedRoute.params.subscribe((params) => {
      this.saleOrderId = params['id'];
      this.addFlag = !this.saleOrderId;
      if (!this.addFlag) {
        this.title = "修改销售单";
      }
    });
    // this.title = this.addFlag?'新建销售订单':'修改销售订单';

    if (!this.addFlag) {
      this.getSaleOrderById(this.saleOrderId);
      this.getSaleGoodsById(this.saleOrderId);
      this.getSaleGoodsGiftById(this.saleOrderId);
      this.getSaleGoodsMaterialById(this.saleOrderId);
      this.buttonFlag = false;
    } else {
      this.saleOrder.soNum = this.soNum;
    }
  }

  /*返回信息列表*/
  cancel(): void {
    this.checkAllInput = false;
    this.location.back();
  }

  customerStoreChange(customerStoreId) {
    this.service.getSaleGoods().then((result) => {
      this.goods = result.data;
      this.goods.map(data => {
        if (data.storeInfo) {
          data.storeInfo.map(terminal => {
            if (terminal.terminalName == customerStoreId) {
              data.goodsPrice = terminal.terminalPrice;
            } else {
              data.goodsPrice = data.goodsRetailPrice;
            }
          });
        } else {
          data.goodsPrice = data.goodsRetailPrice;
        }
      });
    });
  }

  /*查询销售订单信息*/
  getSaleOrderById(saleOrderId: string) {
    this.service.getSaleOrderById(saleOrderId).then((result) => {
      this.saleOrder = result.data;
      this.staffName = this.saleOrder.staffName;
      this.getCustomer();
      this.getCustomerStore(this.saleOrder.customerId);
      this.customerStoreChange(this.saleOrder.customerStoreId);
    });
  }

  /*查询销售订单商品信息*/
  getSaleGoodsById(saleOrderId: string) {
    this.service.getSaleGoodsById(saleOrderId).then((result) => {
      this.selectedGoods = result.data;
      this.selectedGoods.map(data => {
        data.goodsPrice = data.contractTotalAmount/data.saleQuantity;
      })
    });
  }

  /*查询销售订单赠品信息*/
  getSaleGoodsGiftById(saleOrderId: string) {
    this.service.getSaleGoodsGiftById(saleOrderId).then((result) => {
      this.selectedGiftGoods = result.data;
    });
  }

  /*查询销售订单物料信息*/
  getSaleGoodsMaterialById(saleOrderId: string) {
    this.service.getSaleGoodsMaterialById(saleOrderId).then((result) => {
      this.selectedMaterialGoods = result.data;
    });
  }

  getSaleGoodsGift() {
    let gift = "01";
    this.service.getSaleGoodsGift(gift).then((result) => {
      this.giftGoods = result.data;
    })
  }

  getSaleGoodsMaterial() {
    let material = "01";
    this.service.getSaleGoodsMaterial(material).then((result) => {
      this.materialGoods = result.data;
    })
  }

  getCustomer() {
    this._customerService.getCustomer().then((data) => {
      this.customerList = data.data;
    });
  }

  getCustomerStore(customerId) {
    this._customerService.getCustomerById(customerId).then((data) => {
      this.customerStoreList = data.data.listStore;
    });
  }

  typeChange(customerId) {
    if(customerId != "") {
      this._customerService.getCustomerById(customerId).then((data) => {
        this.saleOrder.customerStoreId = '';
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
        this.saleOrder.staffId = $event.data[0].id;
        this.staffName = $event.data[0].data.name;
      }else {
        this.saleOrder.staffId = undefined;
        this.staffName = undefined;
      }
    }
  }

  /**
   * 商品选择事件
   */
  onMultiPickerNotifyGoods($event){
    if($event.type == 'select_item'){
      this.selectedGoods = $event.data;
      //重置已选商品id
      this.cachedSelectedGoodsIds.clear();
      this.selectedGoods.map(data => {
        data.goodsId = data.id;
        this.cachedSelectedGoodsIds.add(data.id);
      });
      //初始化所有商品
      this.goods.map(data => {
        if(this.cachedSelectedGoodsIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
    }
    if($event.type == 'clear_all'){
      this.selectedGoods = [];
      //重置已选商品id
      this.cachedSelectedGoodsIds.clear();
      //初始化所有商品
      this.goods.map(data => {
        delete data['selected'];
      });
    }
  }

  /**
   * 赠品选择事件
   */
  onMultiPickerNotifyGoodsGift($event){
    if($event.type == 'select_item'){
      this.selectedGiftGoods = $event.data;
      //重置已选赠品id
      this.cachedSelectedGiftGoodsIds.clear();
      this.selectedGiftGoods.map(data => {
        data.goodsId = data.id;
        this.cachedSelectedGiftGoodsIds.add(data.id);
      });
      //初始化所有赠品
      this.giftGoods.map(data => {
        if(this.cachedSelectedGiftGoodsIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
    }
    if($event.type == 'clear_all'){
      this.selectedGiftGoods = [];
      //重置已选赠品id
      this.cachedSelectedGiftGoodsIds.clear();
      //初始化所有赠品
      this.giftGoods.map(data => {
        delete data['selected'];
      });
    }
  }

  /**
   * 物料选择事件
   */
  onMultiPickerNotifyGoodsMaterial($event){
    if($event.type == 'select_item'){
      this.selectedMaterialGoods = $event.data;
      //重置已选物料id
      this.cachedSelectedMaterialGoodsIds.clear();
      this.selectedMaterialGoods.map(data => {
        data.goodsId = data.id;
        this.cachedSelectedMaterialGoodsIds.add(data.id);
      });
      //初始化所有赠品
      this.materialGoods.map(data => {
        if(this.cachedSelectedMaterialGoodsIds.has(data.id)){
          data['selected'] = true;
        }else {
          delete data['selected'];
        }
      });
    }
    if($event.type == 'clear_all'){
      this.selectedMaterialGoods = [];
      //重置已选物料id
      this.cachedSelectedMaterialGoodsIds.clear();
      //初始化所有赠品
      this.materialGoods.map(data => {
        delete data['selected'];
      });
    }
  }

  /*选中商品列表操作事件*/
  onSelectedGoodsTableNotify($event){
    switch($event.type){
      case 'delete':
        _.remove(this.seerTable.data, $event.data);
        this.selectedGoods = this.seerTable.data;
        this.cachedSelectedGoodsIds.delete($event.data.id);
        break;
      case 'delete_all':
        $event.data.map(data => {
          _.remove(this.seerTable.data, data);
          this.cachedSelectedGoodsIds.delete($event.data.id);
        });
        this.selectedGoods = this.seerTable.data;
        break;
      case 'onInputValueChanged':
        this.calcGoodsPrice($event.data, $event.key);
        break;
    }
  }

  /*选中赠品列表操作事件*/
  onSelectedGoodsGiftTableNotify($event){
    switch($event.type){
      case 'delete':
        _.remove(this.seerGiftTable.data, $event.data);
        this.selectedGiftGoods = this.seerGiftTable.data;
        this.cachedSelectedGiftGoodsIds.delete($event.data.id);
        break;
      case 'delete_all':
        $event.data.map(data => {
          _.remove(this.seerGiftTable.data, data);
          this.cachedSelectedGiftGoodsIds.delete($event.data.id);
        });
        this.selectedGiftGoods = this.seerGiftTable.data;
        break;
      case 'onInputValueChanged':
        this.calcGoodsPrice($event.data, $event.key);
        break;
    }
  }

  /*选中物料列表操作事件*/
  onSelectedGoodsMaterialTableNotify($event){
    switch($event.type){
      case 'delete':
        _.remove(this.seerMaterialTable.data, $event.data);
        this.selectedMaterialGoods = this.seerMaterialTable.data;
        this.cachedSelectedMaterialGoodsIds.delete($event.data.id);
        break;
      case 'delete_all':
        $event.data.map(data => {
          _.remove(this.seerMaterialTable.data, data);
          this.cachedSelectedMaterialGoodsIds.delete($event.data.id);
        });
        this.selectedMaterialGoods = this.seerMaterialTable.data;
        break;
      case 'onInputValueChanged':
        this.calcGoodsPrice($event.data, $event.key);
        break;
    }
  }

  /**
   * 计算价格折扣
   */
  private calcGoodsPrice(good:SaleGoods, key:string){
    let shouldBeZero = ['saleDiscount','saleUnitPrice','saleTotalAmount','saleQuantity','contractTotalAmount'];
    for(let data of shouldBeZero){
      if (!good[data]){
        good[data] = 0;
      }
    }
    switch (key){
      case 'saleDiscount':
        good.saleUnitPrice = +(good['goodsPrice'] * (1-good.saleDiscount/100)).toFixed(4);
        break;
      case 'saleUnitPrice':
        good.saleDiscount = +((1 - +good.saleUnitPrice/good['goodsPrice']) * 100).toFixed(2);
        break;
      case 'saleQuantity':
        good.saleTotalAmount = good.saleUnitPrice * good.saleQuantity;
        break;
    }
    good.saleTotalAmount = +good.saleUnitPrice * good.saleQuantity;
    good.contractTotalAmount = +good['goodsPrice'] * good.saleQuantity;
  }

  /*表单提交方法*/
  submitForm() {
    if(!this.buttonFlag){
      this.updateSaleOrder();
    }else{
      this.saveSaleOrder();
    }
  }

  allInput(){
    this.checkAllInput = true;
  }

  saveSaleOrder():void {
    this.saleOrder.invSaleGoodsList = this.selectedGoods;
    this.saleOrder.giftGoodsList = this.selectedGiftGoods;
    this.saleOrder.materialGoodsList = this.selectedMaterialGoods;
    this.saleOrder.soType = this.soType;
    this.saleOrder.soSource = this.soSource;
    this.saleOrder.soState = this.soState;
    let soTotalAmount:number = 0;
    this.selectedGoods.map(good => {
      soTotalAmount = soTotalAmount + good.saleTotalAmount;
    })
    this.saleOrder.soTotalAmount = String(soTotalAmount);
    this.service.createSaleOrder(this.saleOrder).then((result) => {
      if(result.success) {
        this.location.back();
      }
      this.checkAllInput = false;
    });
  }

  updateSaleOrder():void {
    this.saleOrder.invSaleGoodsList = this.selectedGoods;
    this.saleOrder.giftGoodsList = this.selectedGiftGoods;
    this.saleOrder.materialGoodsList = this.selectedMaterialGoods;
    this.saleOrder.soType = this.soType;
    this.saleOrder.soSource = this.soSource;
    this.saleOrder.soState = this.soState;
    let soTotalAmount:number = 0;
    this.selectedGoods.map(good => {
      soTotalAmount = soTotalAmount + good.saleTotalAmount;
    })
    this.saleOrder.soTotalAmount = String(soTotalAmount);
    this.service.updateSaleOrder(this.saleOrder).then((result) => {
      if(result.success) {
        this.location.back();
      }
      this.checkAllInput = false;
    });
  }

}
