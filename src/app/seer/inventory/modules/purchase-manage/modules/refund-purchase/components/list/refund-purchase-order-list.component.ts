import {Component, OnInit} from '@angular/core';
import {PurchaseOrderListComponent} from "../../../purchase-order/components/list/purchase-order-list.component";

@Component({
  selector: 'refund-purchase-order-list',
  styles: [],
  templateUrl: '../../../purchase-order/components/list/purchase-order-list.component.html'
})
export class RefundPurchaseOrderListComponent extends PurchaseOrderListComponent {
  editPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/order';
  detailPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/order-detail';

  /** 退单 */
  poType = '01';
  titlesOptional = [
    {key:'poNum',label:'采购退单编号',show:true,type:'link'},
    {key:'supplierName',label:'供应商',show:true},
    {key:'poCategory',label:'采购分类',show:true,isDict:true},
    {key:'poDate',label:'订单日期',show:true},
    {key:'poTotalAmount',label:'订单金额',show:true},
    {key:'paymentMethod',label:'付款方式',show:true,isDict:true},
    {key:'invoiceReceip',label:'发票回执',isDict:true},
    {key:'staffName',label:'我方员工'},
    {key:'poSource',label:'订单来源'},
    {key:'poState',label:'订单状态',show:true,isDict:true/**,dictKeyId:'PO_STATE',//因为字段名和字典键一致，不需要传dictKeyId*/},
    {key:'poStateDetail',label:'审批状态',show:true},
    {key:'poRemark',label:'备注'},
  ];
  titles = this.titlesOptional.filter(title=>title['show']);
}
