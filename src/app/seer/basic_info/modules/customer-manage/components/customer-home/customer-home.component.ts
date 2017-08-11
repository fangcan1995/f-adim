import {Component} from "@angular/core";
@Component({
  selector: 'customer-home',
  template:`
<div class="widget">
  <customer-operation></customer-operation>
  <customer-list></customer-list>
</div> 
`
})
export class CustomerHomeComponent{

}
