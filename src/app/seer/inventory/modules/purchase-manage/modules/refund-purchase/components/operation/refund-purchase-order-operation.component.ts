import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PurchaseOrderOperationComponent} from "../../../purchase-order/components/operation/purchase-order-operation.component";

@Component({
  selector: 'refund-purchase-order-operation',
  styles: [
`.input-group-btn{
  font-size: 14px;
}`,
`.input-group-btn > .btn{
    height: 35px;
    margin-left: -1px !important;

}`],
  encapsulation: ViewEncapsulation.None,
  templateUrl: '../../../purchase-order/components/operation/purchase-order-operation.component.html'
})
export class RefundPurchaseOrderOperationComponent extends PurchaseOrderOperationComponent{
  /** 采购退单 */
  poType = '01';
  title = '采购退单查询';
}
