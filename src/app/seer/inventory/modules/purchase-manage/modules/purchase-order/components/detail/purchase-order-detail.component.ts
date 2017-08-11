import {Component, ViewEncapsulation, OnInit, ViewChild, Input} from '@angular/core';
import {PurchaseOrder} from "../../../../../../../model/inventory/purchase-order";
import { Location } from '@angular/common';
import {PurchaseOrderService} from "../../purchase-order.service";
import {PurchaseGoods} from "../../../../../../../model/inventory/purchase-good";
import {Result} from "../../../../../../../model/result.class";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {seerTotalTableComponent} from "../../../../../../../common/seer_total_table/seer.total.table";
import {DynamicComponentLoader} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {PurchaseGoodsTitles} from "../const";
import {BaseTaskDTO} from "../../../../../../../model/workflow/base-task-dto";
import {PROCESS, FILTER_PROPERTY, SERVER, ORDER_STATE} from "../../../../../../../const";
import {ProcessNodeConfig} from "../../../../../../../model/workflow/process-node-config";
import {CensorHistory} from "../../../../../../../model/workflow/process-censor-history";
import {PurchaseOrderVO} from "../VOs/purchase-order-vo";
import {ProcessHistoryComponent} from "../../../../../../../common/process/process-history-modal.component";
import {TemplateVO} from "../../../../../../../sys/modules/template-manage/components/edit-template/TemplateVO";
import {TemplateManageService} from "../../../../../../../sys/modules/template-manage/template-manage.service";

@Component({
  selector: 'purchase-order-detail',
  styleUrls: ['../../style.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './purchase-order-detail.component.html',
  entryComponents:[ProcessHistoryComponent]
})
export class PurchaseOrderDetailComponent implements OnInit{
  @ViewChild('selectedGoodsTable') seerTable:seerTotalTableComponent;
  @Input() orderId:string;
  confirmCensorDTO:BaseTaskDTO = new BaseTaskDTO();
  orderType = '采购订单';

  purchaseOrder:PurchaseOrder = new PurchaseOrder();
  purchaseGoods:PurchaseGoods[] = [];

  totalQuantity = 0;
  lastHistory;
  process;

  ORDER_STATE = ORDER_STATE;

  purchaseGoodsTitles = PurchaseGoodsTitles;
  editPageUrl = '/seer/inventory/purchase-manage/purchase-order-manage/order';

  constructor(protected route?: ActivatedRoute,protected location?: Location, protected service?:PurchaseOrderService, protected templateManageService?:TemplateManageService,private router?:Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let orderId = params['orderId'] || this.orderId;
      this.confirmCensorDTO.taskId = params['taskId'];
      this.confirmCensorDTO.token = this.service.getCurrentUser().staffId;
      if(orderId){
        this.service.getPurchaseOrderById(orderId).then((result:Result)=>{
          if(result.success){
            this.purchaseOrder = result.data;
            this.process = PROCESS.filterProcess(FILTER_PROPERTY.PURCHASE|(this.purchaseOrder.poType=='00'?FILTER_PROPERTY.NORMAL:FILTER_PROPERTY.REFUND));
            this.service.getOrderCensorHistory(orderId).then(result=>{
              if (result.success){
                if(result.data.length>0){
                  this.lastHistory = result.data[result.data.length-1];
                }
              }
            })
          }else {
            alert(result.message);
          }
          this.orderType = this.purchaseOrder.poType=='00'?'采购订单':'采购退单';
        });
        this.service.getGoodsByPOId(orderId).then((result:Result)=>{
          if(result.success){
            this.purchaseGoods = result.data;
            let totalQuantity = 0;
            this.purchaseGoods.map((good)=>{
              totalQuantity += +good.purchaseQuantity;
            });
            this.totalQuantity = totalQuantity;
          }else {
            alert(result.message);
          }
        });
        this.getTemplateByType("00");
      }else {
        alert('未找到订单号');
      }
    });
  }

  goBack(){
    this.location.back();
  }


  export() {
    //alert("export");

    //console.log(this.purchaseOrder);


    this.purchaseOrder.totalQuantity = this.totalQuantity.toString();

    //console.log(this.purchaseGoods);

    //console.log(this.purchaseGoodsTitles);

    let param = {
      "datamap": this.purchaseOrder,
      "data": this.purchaseGoods,
      "titles": this.purchaseGoodsTitles
    };



    //console.log(param);

    this.service.exportExcelByTemplate(param).then(result => {
      //console.log(result.json().data);
      this.download(result.json().data);
    });

  }

  download(data) {
    var a = document.createElement('a');
    var url = data;
    var filename = 'download.xls';
    a.href = url;
    a.download = filename;
    a.click();
  }

  confirmOrder(){
    if(confirm('确认后将进入入库流程和支付流程，请确认')) {
      this.service.confirmOrder(this.confirmCensorDTO).then(result => {
        if (result.success) {
          alert('确认成功');
          this.location.back();
        } else {
          alert(result.message)
        }
      });
    }
  }

  editOrder(){
    this.router.navigate([this.editPageUrl, this.purchaseOrder.id, this.confirmCensorDTO.taskId]);
  }

  abandonOrder(){
    let purchaseOrderWithGoodsVO = new PurchaseOrderVO();
    purchaseOrderWithGoodsVO.purchaseOrder.poState = '-1';
    purchaseOrderWithGoodsVO.purchaseOrder.id = this.purchaseOrder.id;
    purchaseOrderWithGoodsVO.taskId = this.confirmCensorDTO.taskId;
    this.service.updateOrder(purchaseOrderWithGoodsVO).then(result=>{
      if(result.success){
        alert('此订单已放弃审批');
        this.location.back();
      }else {
        alert(result.message);
      }
    })
  }

  templates = []; //采购模板数组

  getTemplateByType(templateType:string){
    this.templateManageService.getTemplateByType(templateType).then(result=>{
      if(result.success){
        this.templates = result.data;
      }else {
        alert(result.message);
      }
    })
  }


  printPreview(templateId:string) {

    this.purchaseOrder.totalQuantity = this.totalQuantity.toString();

    //console.log("订单信息：" + this.purchaseOrder);
    //console.log("商品信息：" + this.purchaseGoods);
    //console.log("商品列：" + this.purchaseGoodsTitles);

    let param = {
      "datamap": this.purchaseOrder,
      "data": this.purchaseGoods,
      "titles": this.purchaseGoodsTitles
    };
    console.log("订单信息：");
    console.log(param);


    //console.log(param);

    /*this.service.exportExcelByTemplate(param).then(result => {
     //console.log(result.json().data);
     this.download(result.json().data);
     });*/



  }
}
