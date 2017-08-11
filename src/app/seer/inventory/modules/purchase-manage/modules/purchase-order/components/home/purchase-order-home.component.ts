import {Component} from '@angular/core';

@Component({
  selector: 'purchase-order-home',
  styles: [],
  template: `
<purchase-order-operation></purchase-order-operation>
<purchase-order-list></purchase-order-list>
`
})
export class PurchaseOrderHomeComponent {

  constructor() {
  }
}
