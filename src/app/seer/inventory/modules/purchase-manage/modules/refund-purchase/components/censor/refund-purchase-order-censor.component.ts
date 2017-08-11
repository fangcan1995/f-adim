import {Component, ViewEncapsulation} from '@angular/core';
import {PurchaseOrderCensorComponent} from "../../../purchase-order/components/censor/purchase-order-censor.component";

@Component({
  selector: 'purchase-order-edit',
  styles: ['../../../purchase-order/style.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: '../../../purchase-order/components/censor/purchase-order-censor.component.html',
})
export class RefundPurchaseOrderCensorComponent extends PurchaseOrderCensorComponent{
}
