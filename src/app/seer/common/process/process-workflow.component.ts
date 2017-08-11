import {Component, ViewEncapsulation, OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import {BaseService} from "../../base.service";
import {ProcessNodeConfig} from "../../model/workflow/process-node-config";
import {CensorHistory} from "../../model/workflow/process-censor-history";
import {ORDER_STATE} from "../../const";
import {DynamicComponentLoader} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ProcessHistoryComponent} from "./process-history-modal.component";

@Component({
  selector: 'seer-workflow',
  template:
    `
<workflow [tasks]="tasks" title="查看审批记录" (click)="showCensorHistory()"></workflow>
<div dynamic-component></div>
    `,
  encapsulation: ViewEncapsulation.Emulated
})
export class ProcessWorkflowComponent implements OnChanges{

  @Input() orderId;
  @Input() processKey;
  @ViewChild(DynamicComponentLoader) dynamicComponentLoader:DynamicComponentLoader;

  processConfig = [];
  processHistory = [];
  currentCensorLevel = 1;

  tasks:{className:'pass'|'refuse'|'active'|'', name: string, level?: number}[] = [{className:'active', name:'提交'}];

  ngOnChanges(): void {
    if(!this.orderId||!this.processKey){
      return;
    }
    this.service.getOrderCensorHistory(this.orderId).then(result=>{
      if (result.success){
        this.processHistory = result.data;
        if(result.data.length>0){
          let lastRecord = result.data[result.data.length-1];
          //流程结束的话，就不需要去config表查数据了，需要的东西都在历史纪录里
          if(lastRecord.orderState==ORDER_STATE.ABANDONED||lastRecord.orderState==ORDER_STATE.CONFIRMED){
            this.getWorkflowHistory();
          }
          //流程没结束，需要在config表中查询未走到的流程节点
          else {
            this.service.getOrderCensorConfig(this.processKey).then(result=>{
              if (result.success){
                this.processConfig = result.data;
                this.getWorkflowTasksData();
              }
            });
          }
        }

      }else {
        alert(result.message)
      }
    });
  }

  showCensorHistory(){
    this.dynamicComponentLoader.loadComponent(ProcessHistoryComponent,this.orderId);
  }

  getWorkflowHistory(){
    if (!this.processHistory){
      return;
    }
    this.processHistory.map((record:CensorHistory)=>{
      switch (record.orderState){
        case ORDER_STATE.BEGIN_PROCESS:
          this.tasks[0] = {className:'pass', name:'提交'};
          break;
        case ORDER_STATE.VOTING:
        case ORDER_STATE.VOTE_FAIL:
        case ORDER_STATE.VOTE_PASS:
          this.currentCensorLevel += record.isPassed=='01'?1:-1;
          this.tasks[+record.currentNode] = {className: record.isPassed=='01'?'pass':"refuse", level: +record.currentNode, name: record.nodeName};
          break;
        case ORDER_STATE.RESUBMIT:
          this.currentCensorLevel += 1;
          this.tasks[0] = {className:'pass',name:'重新提交'};
          break;
        case ORDER_STATE.ABANDONED:
          this.tasks[0] = {className: "refuse", name: '放弃订单'};
          break;
        case ORDER_STATE.CONFIRMED:
          this.tasks[this.tasks.length] = {className: "pass", name: '确认订单'};
          break;
      }
    });
  }

  //未完成的流程，要通过config去获得以后的节点
  getWorkflowTasksData(){
    if (!this.processHistory || !this.processConfig){
      return;
    }
    //增加提交节点
    this.tasks[0] = {className:'pass', name: '提交'};
    this.processConfig.map((config:ProcessNodeConfig)=>{
      this.tasks.push({className:'',level:+config.nodeSort,name:config.nodeName})
    });
    if (this.processHistory.length==0){
      this.tasks[1].className = 'active';
    }else {
      this.getWorkflowHistory();
      this.tasks.push({className:'', name: '确认'});
      this.tasks[this.currentCensorLevel].className = 'active';
    }
  }

  constructor(private service?:BaseService<any>) {
  }
}
