import {Component, ViewEncapsulation} from "@angular/core";
import {SaleOrderAddComponent} from "../../../sale-order/components/add/sale-order-add.component";
/**
 * Created by Administrator on 2017/1/22.
 */
@Component({
  selector: 'sale-return-add',
  templateUrl: '../../../sale-order/components/add/sale-order-add.component.html',
  styleUrls: ['../../../sale-order/sale-order.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleReturnAddComponent extends SaleOrderAddComponent{
  title = '新建销售退单';

  /** 订单类型 */
  soType = '01';
  /** 订单来源 */
  soSource = '00';
  /** 订单状态 */
  soState = '00';

  soNum = 'XT' + new Date().getTime();
}
