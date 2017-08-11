import {Component, Input, Output, EventEmitter, OnChanges, OnInit} from "@angular/core";
import {StorageService} from "../../storage-manage.service";
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {PurchaseOrderService} from "../../../../../purchase-manage/modules/purchase-order/purchase-order.service";
import {SaleOrderService} from "../../../../../sales-manage/modules/sale-order/sale-order.service";
@Component({
  selector: 'goods-list-storage-component',
  templateUrl: './goods.list.storage.component.html',
  styleUrls: ['./goods.list.storage.component.css'],
  providers: [StorageService,PurchaseOrderService,SaleOrderService],
})
export class GoodsListStorageComponent implements OnInit ,OnChanges{


  @Input() id;   //订单编号
  @Input() type;  //订单类型
  @Input() currentOrder; //当前订单信息
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('childModal') public childModal:ModalDirective;
  errorMessage;
  pruchase_goods = [];   //当前订单关联商品列表
  goodsList = [];    //商品列表
  storagesList=[];//库房列表


  pruchase_goods_plus = [];
  pruchase_goods_less = [];
  pruchase_goods_plus_less_titles = [
    {
      key:'goodsNumber',
      label:'商品编号',
    },
    {
      key:'goodsName',
      label:'商品名称',
    },
    {
      key:'goodsBarCode',
      label:'条形码',
    },
    {
      key:'purchaseQuantity',
      label:'商品数量',
    },
    {key:'supplierName', label:'所属供应商'},
    {key:'brandName', label:'所属品牌'},
  ];


  constructor(private storageService:StorageService,
              private saleOrderService:SaleOrderService,
              private purchaseOrderService:PurchaseOrderService) {
  }

  /**
   * 当前订单变更时触发时间
   * @param id
   */
  ngOnChanges(id) {
    if(this.id){
      this.pruchase_goods = [];
      let obj ;
      if(this.type=='00'){     //采购
        obj = {poNum:this.id};
        this.purchaseOrderService.getPurchaseOrders(obj).then(res=>{
          this.purchaseOrderService.getGoodsByPOId(res.data[0].id).then(result=>{
            console.log(result.data)
            this.pruchase_goods = result.data;
            let id = this.id;
            this.pruchase_goods.forEach(function(item){
              item.inRecords = [
                {
                  goodsId:item.goodsId,
                  goodsQuantity:item.purchaseQuantity,
                  validityType:'01',
                  validityDate:'',
                  poGoodsId: item.id,
                  poId: id,
                  storageAreaId:'',
                }
              ];
            })

          });
        });
      }else if(this.type=='01'){//销售退

        this.storageService.getSoGoodsByOrderId(this.id)
          .subscribe(
            res => {
              this.pruchase_goods = res.data;
              let id = this.id;
              this.pruchase_goods.forEach(function(item){
                item.inRecords = [
                  {
                    goodsId:item.goodsId,
                    goodsQuantity:item.saleQuantity,
                    validityType:'01',
                    validityDate:'',
                    poGoodsId: item.id,
                    poId: id,
                    storageAreaId:'',
                  }
                ];
              })
            },
            error => this.errorMessage = <any>error);
      }


      /**
       * get all goods
       */
      this.storageService.searchGoods({}).then((result) => {
        this.goodsList = result.data;
      });


      /**
       * get all storages
       */
      this.storageService.getStorages().then((res) => {
        this.storagesList = res.data;
      });

    }
  }


  ngOnInit(): void {

  }

  /**
   * 商品增加新的效期
   * @param pruchase_good
   * @param total
   */
  addInRecords(pruchase_good,total){
    let id = this.id;
    let num = 0;
    pruchase_good.inRecords.forEach(function(item){
      num = num + Number(item.goodsQuantity);
    });
    let quantity;
    if(num<Number(total)){
      quantity = Number(total)-num;
      pruchase_good.inRecords.push( {
        goodsId:pruchase_good.goodsId,
        /*      goodsQuantity:pruchase_good.purchaseQuantity,*/
        goodsQuantity:quantity,
        validityType:'01',
        validityDate:'',
        poGoodsId: pruchase_good.id,
        poId: id,
      })
    }else{
      pruchase_good.inRecords.push( {
        goodsId:pruchase_good.goodsId,
        /*      goodsQuantity:pruchase_good.purchaseQuantity,*/
        goodsQuantity:'',
        validityType:'01',
        validityDate:'',
        poGoodsId: pruchase_good.id,
        poId: id,
      })
    }

  }


  /**
   * 移除效期
   * @param pruchase_good
   * @param index
   */
  removeInRecords(pruchase_good,index){
    pruchase_good.inRecords.splice(index,1);
  }


  currentList;
  //checkbox
  checkGoodsNum = {
    plus :true,
    less :true
  };

  action;

  /**
   * 保存订单，入库
   */
  save(){

    let list = [];
    let pruchase_goods_plus = [];
    let pruchase_goods_less = [];
    this.pruchase_goods.forEach(function(item){
      let y = Object.assign({}, item);
      let purchaseQuantity = Number(item.purchaseQuantity);
      let goodsQuantity = 0;
      item.inRecords.forEach(function(record){
        if(record.goodsQuantity&&record.goodsQuantity!=''&&record.goodsQuantity!=0){
          goodsQuantity = goodsQuantity + Number(record.goodsQuantity);
          list.push(record);
        }
      });
      let item_copy = Object.assign({}, item);
      if(purchaseQuantity<goodsQuantity){
        item_copy.purchaseQuantity = goodsQuantity - purchaseQuantity;
        //delete item_copy.inRecords;
        pruchase_goods_plus.push(item_copy);
      }else if(purchaseQuantity>goodsQuantity){
        //delete item_copy.inRecords;
        item_copy.purchaseQuantity = purchaseQuantity - goodsQuantity;
        pruchase_goods_less.push(item_copy);
      }


    });
    this.pruchase_goods_plus = pruchase_goods_plus;
    this.pruchase_goods_less = pruchase_goods_less;
    console.log('5555555555')
    console.log(this.pruchase_goods_plus)
    console.log(this.pruchase_goods_less)
    if(this.type=='00'&&(this.pruchase_goods_plus.length||this.pruchase_goods_less.length)){
      this.checkGoodsNum = {
        plus :true,
        less :true
      };
      this.showChildModal();
      this.currentList = list;
    }else{
      this.action = 'show';
      //this.saveOrder(list);
    }


  }

  /**
   * 增加新的订单以及商品
   */
  addNewOrder(){
    let currentOrder = this.currentOrder;
    if(this.pruchase_goods_plus.length&&this.checkGoodsNum.plus){

      currentOrder.associatedNum = this.currentOrder.id;
      currentOrder.poType = '00';
      currentOrder.poSource = '01';
      currentOrder.poNum = 'CG'+new Date().getTime();
      console.log('77777777')
      console.log(currentOrder)
      this.storageService.addpurchaseorder(currentOrder).subscribe(
        res => {
          let id = res.data;
          this.pruchase_goods_plus.forEach(function(good){
            good.purchaseOrderId = id;
            delete good.inRecords;
          });
          this.storageService.addpurchaseordergoods(this.pruchase_goods_plus).subscribe(
            res1 => {
              console.log(res1.data)
            },
            error => this.errorMessage = <any>error);
        },
        error => this.errorMessage = <any>error);
    }

    if(this.pruchase_goods_less.length&&this.checkGoodsNum.less){
      currentOrder.associatedNum = this.currentOrder.id;
      currentOrder.poType = '01';
      currentOrder.poSource = '01';
      currentOrder.poNum = 'CT'+new Date().getTime();
      this.storageService.addpurchaseorder(currentOrder).subscribe(
        res => {
          let id = res.data;
          this.pruchase_goods_less.forEach(function(good){
            delete good.inRecords;
            good.purchaseOrderId = id;
          });
          this.storageService.addpurchaseordergoods(this.pruchase_goods_less).subscribe(
            res1 => {
              console.log(res1.data)
            },
            error => this.errorMessage = <any>error);
        },
        error => this.errorMessage = <any>error);


    }

    this.saveOrder(this.currentList);
  }

  /**
   * 入库，进入入库记录表和库存表
   * @param list
   */
  saveOrder(list){
    for(let i=0;i<list.length;i++){
      list[i].goodsNum = list[i].goodsQuantity;

      for(let j=0;j<this.goodsList.length;j++){
        for(let z=0;z<this.storagesList.length;z++){
          if(list[i].goodsId==this.goodsList[j].id){
            if(this.storagesList[z].storageBrandId==this.goodsList[j].brandId){
              console.log(this.storagesList[z].id)
              list[i].storageAreaId=this.storagesList[z].id;
            }
          }
        }
      }
    }


    console.log(list)
    this.storageService.add(list)
      .subscribe(
        res => {
          console.log(res.data)
        },
        error => this.errorMessage = <any>error);

    this.storageService.addrepertory(list)
      .subscribe(
        res => {
          console.log(res.data)
        },
        error => this.errorMessage = <any>error);

    this.id = false;
    this.notify.emit({type: 'cancel'});
/*    if(this.type=='00'){
      console.log(this.currentOrder)
      this.storageService.updatepurchaseorder(this.currentOrder).subscribe(
        res => {
          console.log(res.data)
          this.id = false;
          this.notify.emit({type: 'cancel'});
        },
        error => this.errorMessage = <any>error);
    }else if(this.type=='01'){
      console.log('888888888')
      console.log(this.currentOrder)
      this.storageService.updatesaleorder(this.currentOrder).subscribe(
        res => {
          console.log(res.data)
          this.id = false;
          this.notify.emit({type: 'cancel'});
        },
        error => this.errorMessage = <any>error);
    }*/
  }


  /**
   * 关闭
   */
  cancel(){
    this.id = false;
    this.notify.emit({type: 'cancel'});
  }


  /**
   * 显示提示框
   */
  public showChildModal():void {
   this.childModal.show();

  }


  /**
   * 关闭提示框
   */
  public hideChildModal():void {
    this.childModal.hide();
  }

  /**
   * 提示框内选择确定或者取消按键
   * @param event
   */
  onSelectAlert(event){
    if(event.type=='save'){
      this.saveOrder(this.currentList);
      this.action = false;
    }else if(event.type=='cancel'){
      this.action = false;
    }
  }


  query = "";
  filteredList;

  getData() {
    if (this.query !== "") {
      return this.filteredList;
    } else {
      return this.pruchase_goods;
    }
  }

  filter() {
    this.filteredList = this.pruchase_goods.filter(function (el) {
      var result = "";
      for (var key in el) {
        result += el[key];
      }
      return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    }.bind(this));


  }


}

