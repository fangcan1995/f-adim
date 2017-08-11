import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {PurchaseOrderService} from "../../purchase-order.service";
import {ActivatedRoute, Params} from "@angular/router";
import {OrderCensorDTO} from "../../../../../../../model/workflow/order-censor-dto";
import {Result} from "../../../../../../../model/result.class";
import {PurchaseOrder} from "../../../../../../../model/inventory/purchase-order";
import {FILTER_PROPERTY, PROCESS} from "../../../../../../../const";

@Component({
  selector: 'purchase-order-edit',
  styleUrls: ['../../style.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './purchase-order-censor.component.html',
})
export class PurchaseOrderCensorComponent implements OnInit{
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  censorDTO = new OrderCensorDTO();
  process;

  constructor(protected route?: ActivatedRoute,protected location?: Location, protected service?:PurchaseOrderService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.purchaseOrder.id = params['orderId'];
      this.censorDTO.taskId=params['taskId'];
      this.censorDTO.token=this.service.getCurrentUser().staffId;

      this.service.getPurchaseOrderById(this.purchaseOrder.id).then((result:Result)=>{
        if(result.success){
          this.purchaseOrder = result.data;
          this.process = PROCESS.filterProcess(FILTER_PROPERTY.PURCHASE|(this.purchaseOrder.poType=='00'?FILTER_PROPERTY.NORMAL:FILTER_PROPERTY.REFUND));
        }else {
          alert(result.message);
        }
      });
    });
  }

  /**
   * 取消审批
   */
  cancel(): void {
    if(confirm('确定放弃审批吗?')) {
      this.location.back();
    }
  }

  /**
   * 通过，进入下一级审批
   */
  approve($event){
    if($event.saveType=='censor'){
      this.censorDTO.approved = true;
      this.censorDTO.nextCensorId = $event.selectedCensor;
      this.service.censorOrder(this.censorDTO).then(result => {
        if (result.success) {
          alert('审批成功');
          this.location.back();
        }else {
          alert(result.message)
        }
      });
    }else {
      throw new Error('审批的订单应只有censor类型');
    }
  }
  /**
   * 不通过，返回上一级审批
   */
  refuse(){
    if(confirm('确认拒绝此申请吗？将退回给上一级处理')){
      this.censorDTO.approved = false;
      this.service.censorOrder(this.censorDTO).then(result=>{
        if(result.success){
          alert('审批成功。');
          this.location.back();
        }
      });
    }
  }
}
