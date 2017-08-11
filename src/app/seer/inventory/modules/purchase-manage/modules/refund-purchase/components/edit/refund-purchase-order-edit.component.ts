import {Component, ViewEncapsulation} from '@angular/core';
import {PurchaseOrderEditComponent} from "../../../purchase-order/components/edit/purchase-order-edit.component";

@Component({
  selector: 'refund-purchase-order-edit',
  styleUrls: ['../../../purchase-order/style.scss'],
  styles:[
    `.input-group-btn{
      font-size: 14px;
    }`,
    `.input-group-btn > .btn{
        height: 35px;
        margin-left: -1px !important;
    }`],
  encapsulation: ViewEncapsulation.None,
  templateUrl: '../../../purchase-order/components/edit/purchase-order-edit.component.html',
})
export class RefundPurchaseOrderEditComponent extends PurchaseOrderEditComponent{
  title = '新增采购退单';
  orderNumLabel = '采购退单编号';
  /** 采购退单 */
  poType = '01';
  /** 采购来源 */
  poSource = '00';
  /** 采购订单状态 */
  poState = '00';
}
