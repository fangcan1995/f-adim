import {Component, ViewEncapsulation,} from '@angular/core';
import {PurchaseOrderDetailComponent} from "../../../purchase-order/components/detail/purchase-order-detail.component";
import {ProcessHistoryComponent} from "../../../../../../../common/process/process-history-modal.component";

@Component({
  selector: 'purchase-order-detail',
  styles: ['../../../purchase-order/style.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: '../../../purchase-order/components/detail/purchase-order-detail.component.html',
  entryComponents:[ProcessHistoryComponent]
})
export class RefundPurchaseOrderDetailComponent extends PurchaseOrderDetailComponent{
  editPageUrl = '/seer/inventory/purchase-manage/refund-purchase-order-manage/order';
}
