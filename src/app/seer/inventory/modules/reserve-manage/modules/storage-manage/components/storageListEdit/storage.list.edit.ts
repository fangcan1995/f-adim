import {Component, Input, Output, EventEmitter, OnChanges, OnInit} from "@angular/core";
import {InStorageService} from "../../in-storage-manage.service";
import {ExStorageService} from "../../ex-storage-manage.service";
@Component({
  selector: 'in-ex-storage-list-edit',
  templateUrl: './storage.list.edit.html',
  styleUrls: ['./storage.list.edit.css'],
  providers: [],
})
export class InExStorageListEditComponent  implements OnInit ,OnChanges{

  @Input() id;
  @Input() type;
  @Input() orderType;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  storageService;
  errorMessage;
  orderDetail = {};
  orderDetailList = [];
  associatedOrderList = [];
  material = [];
  gift = [];
  orderDetailListTitles = [
    {key:'goodsName',label:'商品名称'},
    {key:'brandName',label:'品牌'},
    {key:'goodsNumber',label:'商品编码'},
    {key:'goodsBarCode',label:'条形码'},
    {key:'boxRule',label:'箱规'},
    {key:'goodsPrice',label:'合同单价(元)'},
    {key:'purchaseDiscount',label:'折扣(%)',type:'number_input'},
    {key:'purchaseUnitPrice',label:'实际单价(元)',type:'number_input'},
    {key:'purchaseQuantity',label:'订货数量(个)',type:'number_input',total:true},
    {key:'contractTotalAmount',label:'合同金额(元)',total:true},
    {key:'purchaseTotalAmount',label:'实际金额(元)',total:true},
  ];
  associatedOrderListTitles = [
    {key:'soNum',label:'销售订单编号'},
    {key:'storeOrderNum',label:'终端单号'},
    {key:'soCategory',label:'销售分类',isDict:true},
    {key:'receiptMethod',label:'收款方式',isDict:true},
    {key:'shippingMethod',label:'配送方式',isDict:true},
    {key:'deliveryEndDate',label:'送货截止时间'},
    {key:'soType',label:'订单类型',isDict:true},
    {key:'curType',label:'币种',isDict:true},
    {key:'soSource',label:'订单来源',isDict:true},
    {key:'soState',label:'订单状态',isDict:true},
  ];

  goodstitles = [
    {key:'goodsName', label:'商品名称'},
    {key:'supplierName', label:'所属供应商'},
    {key:'brandName', label:'所属品牌'},
    {key:'goodsNumber', label:'商品编号'},
    {key:'goodsType', label:'商品分类',isDict:true},
    {key:'isGift', label:'是否赠品',isDict:true},
    {key:'isMaterial', label:'是否物料',isDict:true}
  ];
  constructor(private inStorageService: InStorageService, private exStorageService: ExStorageService) {
  }

  ngOnInit() {
 /*   if (this.type == 'in') {
      this.storageService = this.inStorageService;
    } else if (this.type == 'ex') {
      this.storageService = this.exStorageService;
    }*/

    if ((this.type == 'in'&&this.orderType=='00')||(this.type == 'ex'&&this.orderType=='01')) {
      this.storageService = this.inStorageService;
    } else if ((this.type == 'in'&&this.orderType=='01')||(this.type == 'ex'&&this.orderType=='00')) {
      this.storageService = this.exStorageService;
    }
  }

  ngOnChanges(id) {
    if ((this.type == 'in'&&this.orderType=='00')||(this.type == 'ex'&&this.orderType=='01')) {
      this.storageService = this.inStorageService;
    } else if ((this.type == 'in'&&this.orderType=='01')||(this.type == 'ex'&&this.orderType=='00')) {
      this.storageService = this.exStorageService;
    }
    if(this.id){
      console.log(this.id)
      this.storageService.getOrderDetail(this.id)
        .subscribe(
          res => {
            console.log(res.data)
            this.orderDetail = res.data;
          },
          error => this.errorMessage = <any>error);

      this.storageService.getDetailList({
        purchaseOrderId: this.id
      })
        .subscribe(
          res => {
            this.orderDetailList = res.data;
          },
          error => this.errorMessage = <any>error);


      this.storageService.getAssociatedOrderList({
        associatedNum: this.id
      })
        .subscribe(
          res => {
            console.log(res.data)
            this.associatedOrderList = res.data;
          },
          error => this.errorMessage = <any>error);

      if((this.type == 'in'&&this.orderType=='01')||(this.type == 'ex'&&this.orderType=='00')){
        this.storageService.getMaterialOrGift({
          saleOrderId: this.id,
          isGift: "01",
        })
          .subscribe(
            res => {
              this.gift = res.data;
            },
            error => this.errorMessage = <any>error);

        this.storageService.getMaterialOrGift({
          saleOrderId: this.id,
          isMaterial: "01",
        })
          .subscribe(
            res => {
              this.material = res.data;
            },
            error => this.errorMessage = <any>error);
      }



    }
  }

  cancel(){
    this.id = false;
    this.notify.emit({type: 'cancel'});
  }



}

