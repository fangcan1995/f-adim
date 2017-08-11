import {ViewEncapsulation, Component} from "@angular/core";
import {SaleOrderListComponent} from "../../../sale-order/components/list/sale-order-list.component";
/**
 * Created by Administrator on 2017/1/22.
 */
@Component({
  selector: 'sale-return-list',
  templateUrl: '../../../sale-order/components/list/sale-order-list.component.html',
  styleUrls: ['../../../sale-order/sale-order.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleReturnListComponent extends SaleOrderListComponent{
  /** 订单类型 */
  soType = '01';

  editPageUrl = '/seer/inventory/sales-manage/refund-sales-order-manage/add';
}
