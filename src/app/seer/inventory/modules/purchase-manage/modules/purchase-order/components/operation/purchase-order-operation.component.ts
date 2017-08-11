import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {PurchaseOrderService} from "../../purchase-order.service";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
import {GlobalState} from "../../../../../../../../global.state";
import {PurchaseOrderListComponent} from "../list/purchase-order-list.component";
import {SERVER} from "../../../../../../../const";

@Component({
  selector: 'purchase-order-operation',
  styles: [
`.input-group-btn{
  font-size: 14px;
}`,
`.input-group-btn > .btn{
    height: 35px;
    margin-left: -1px !important;

}`],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './purchase-order-operation.component.html'
})
export class PurchaseOrderOperationComponent implements OnInit{
  ngOnInit(): void {
    this.term.poType = this.poType;
    this.service.getStaffsWithOrgs().then(result=>{
      if (result.success){
        result.data.map(res=>{
          if (res.customNodeType=='org'){
            res['customIcon'] = 'fa fa-sitemap';
          }
          if (res.customNodeType=='staff'){
            res['customIcon'] = 'ion-person';
          }
        });
        this.staffs = jsonTree(result.data);
      }else {
        alert(result.message);
      }
    });
    let sessionData = localStorage.getItem('data');
    if(sessionData){
      let currentUser = JSON.parse(sessionData)['currentUser'];
      if(currentUser && currentUser.staffId){
        this.term.staffId = currentUser.staffId;
        this.service.getAll(`${SERVER}/basic/staff/${currentUser.staffId}`).then(result=>{
          if (result.success){
            this.selectedStaffName = result.data.staffName;
          }else {
            alert(result.message);
          }
        })
      }
    }
  }

  term:{timeBegin?:string, timeEnd?:string, staffId?:string, supplierId?:string, poType?:string, poCategory?:string, poState?:string} = {};
  staffs = [];
  selectedStaffName;
  supplierName;
  title = '采购订单查询';
  /** 采购订单 */
  poType = '00';
  constructor(protected service?:PurchaseOrderService,protected gs?:GlobalState) {
  }

  /**
   * 树选择事件
   */
  onTreePickerNotify($event){
    if($event.eventName=="onSelectCompleted"){
      if($event.data.length>0) {
        this.term.staffId = $event.data[0].id;
        this.selectedStaffName = $event.data[0].data.name;
      }else {
        this.term.staffId = undefined;
        this.selectedStaffName = undefined;
      }
    }
  }
  /**
   * 选择了供应商事件
   */
  onSelectSupplier($event){
    this.supplierName = $event.data.supplierName;
    this.term.supplierId = $event.data.id;
  }
  reset(){
    this.term.staffId = undefined;
    this.selectedStaffName = undefined;
    this.term = {poType:this.poType};
    this.search();
  }

  search(){
    this.gs.notify(PurchaseOrderListComponent.RELOAD_EVENT,this.term);
  }
}
