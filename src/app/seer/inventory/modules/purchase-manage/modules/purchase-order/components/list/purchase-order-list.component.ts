import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Result} from "../../../../../../../model/result.class";
import {PurchaseOrderService} from "../../purchase-order.service";
import {PurchaseOrder} from "../../../../../../../model/inventory/purchase-order";
import {GlobalState} from "../../../../../../../../global.state";

@Component({
  selector: 'purchase-order-list',
  styles: [],
  templateUrl: './purchase-order-list.component.html'
})
export class PurchaseOrderListComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this.gs.unsubscribe(PurchaseOrderListComponent.RELOAD_EVENT);
  }

  data = [];
  public static RELOAD_EVENT = 'PurchaseOrderListComponent-reload';

  titlesOptional = [
    {key:'poNum',label:'采购订单编号',show:true, type:'link'},
    {key:'supplierName',label:'供应商',show:true},
    {key:'poCategory',label:'采购分类',show:true,isDict:true},
    {key:'poDate',label:'订单日期',show:true},
    {key:'poTotalAmount',label:'订单金额',show:true},
    {key:'paymentMethod',label:'付款方式',show:true,isDict:true},
    {key:'invoiceReceipt',label:'发票回执',isDict:true},
    {key:'staffName',label:'我方员工'},
    {key:'poSource',label:'订单来源',isDict:true},
    {key:'poState',label:'订单状态',show:true,isDict:true/**,dictKeyId:'PO_STATE',//因为字段名和字典键一致，不需要传dictKeyId*/},
    {key:'poStateDetail',label:'审批状态',show:true},
    {key:'poRemark',label:'备注'},
  ];

  titles = this.titlesOptional.filter(title=>title['show']);
  editPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/order';
  detailPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/order-detail';

  /** 采购订单 */
  poType = '00';

  ngOnInit(): void {
    this.service.getPurchaseOrders({poType:this.poType}).then((result:Result)=>{
      if (result.success){
        this.data = result.data;
        this.data.map(po=>{
          if(po.poTotalAmount)
          po.poTotalAmount = +po.poTotalAmount;
        })
      }
    })
  }

  constructor(protected service?:PurchaseOrderService,protected router?:Router,protected gs?:GlobalState) {
    this.gs.subscribe(PurchaseOrderListComponent.RELOAD_EVENT, term=>{
      this.service.getPurchaseOrders(term).then((result:Result)=>{
        if (result.success){
          this.data = result.data
        }
      })
    });
  }

  onChange(message):void {

    if(message.type=='add'){
      this.router.navigate([this.editPageUrl]);
    }

    if(message.type=='link'){
      this.router.navigate([this.detailPageUrl,message.data.id]);
    }

    if(message.type=='update'){
      if(message.data.poState=='00') {
        this.router.navigate([this.editPageUrl,message.data.id]);
      }
      if(message.data.poState=='01') {
        this.router.navigate([this.detailPageUrl, message.data.id]);
      }
    }

    if(message.type=='delete'){
      this.service.deleteOrder(message.data.id).then((data) => {
        if ( data.success ){
          this.ngOnInit();
        }else {
          alert("删除失败");
        }
      });
    }

    if(message.type=='delete_all') {
      let ids = [];
      message.data.map((p:PurchaseOrder)=>ids.push(p.id));

      this.service.deleteOrder(ids.toString()).then((data) => {
        if (data.success) {
          this.ngOnInit();
        }else {
          alert("删除失败");
        }
      });
    }
  }
}
