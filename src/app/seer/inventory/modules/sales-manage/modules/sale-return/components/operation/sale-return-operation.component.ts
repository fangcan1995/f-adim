import {ViewEncapsulation, Component} from "@angular/core";
import {SaleOrderOperationComponent} from "../../../sale-order/components/operation/sale-order-operation.component";
/**
 * Created by Administrator on 2017/1/22.
 */
@Component({
  selector: 'sale-return-operation',
  templateUrl: '../../../sale-order/components/operation/sale-order-operation.component.html',
  styleUrls: ['../../../sale-order/sale-order.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleReturnOperationComponent extends SaleOrderOperationComponent{
  /** 订单类型 */
  soType = '01';
}
