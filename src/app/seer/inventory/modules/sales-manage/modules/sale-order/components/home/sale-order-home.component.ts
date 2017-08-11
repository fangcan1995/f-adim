import {Component} from "@angular/core";
/**
 * Created by Administrator on 2017/1/13.
 */
@Component({
  selector: 'sale-order-home',
  template:`<div class="widget">
            <sale-order-operation></sale-order-operation>
            <sale-order-list></sale-order-list>
            </div>`
})
export class SaleOrderHomeComponent{

}
