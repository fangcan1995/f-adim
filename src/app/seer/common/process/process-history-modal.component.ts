import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {BaseModalComponent} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../theme/components/ng2-bs4-modal/modal";
import {PROCESS, ORDER_STATE} from "../../const";
import {BaseService} from "../../base.service";

@Component({
  selector: 'process-history',
  template:
    `
<modal [animation]="true" [backdrop]="true" [componentInstance]="this">
  <modal-header>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="closeModal()">
      <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title">流程历史记录</h4>
  </modal-header>
  <modal-body>
    <div class="col-lg-12" style="margin-bottom: -15px;">
      <timeline [list]="censorHistory" [containerStyle]="{'max-height':'500px','overflow': 'scroll'}"></timeline>
    </div>
  </modal-body>
  <modal-footer>
    <button class="btn btn-default" (click)="closeModal()">关闭</button>
  </modal-footer>
</modal>

    `,
  encapsulation: ViewEncapsulation.Emulated
})
export class ProcessHistoryComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  censorHistory:{name?,createTime?,className?,censorStaff?,approvalOpinion?}[] = [];
  ngOnInit(): void {
    this.init(this.modal);


    this.service.getOrderCensorHistory(this.data).then(result=>{
      if (result.success){
        if(result.data.length>0){
          this.getWorkflowHistory(result.data);
        }
      }else {
        alert(result.message)
      }
    });
  }


  constructor(private service?:BaseService<any>) {
    super();
  }

  private getWorkflowHistory(historyRecords) {
    historyRecords.forEach(history=>{
      switch (history.orderState){
        case ORDER_STATE.VOTING:
        case ORDER_STATE.VOTE_PASS:
        case ORDER_STATE.VOTE_FAIL:
          this.censorHistory.push({
            name: history.nodeName,
            className: history.isPassed == '01' ? 'pass' : 'refuse',
            approvalOpinion: history.approvalOpinion,
            createTime: history.createTime,
            censorStaff: history.censorStaffName,
          });
          break;
        case ORDER_STATE.ABANDONED:
          this.censorHistory.push({
            name: '订单作废',
            className: '',
            approvalOpinion: '',
            createTime: history.createTime,
            censorStaff: history.censorStaffName,
          });
          break;
        case ORDER_STATE.RESUBMIT:
          this.censorHistory.push({
            name: '重新提交审批',
            className: '',
            approvalOpinion: '',
            createTime: history.createTime,
            censorStaff: history.censorStaffName,
          });
          break;
        case ORDER_STATE.CONFIRMED:
          this.censorHistory.push({
            name: '订单已确认',
            className: '',
            approvalOpinion: '',
            createTime: history.createTime,
            censorStaff: history.censorStaffName,
          });
          break;
        case ORDER_STATE.BEGIN_PROCESS:
          this.censorHistory.push({
            name: '订单提交审批',
            className: '',
            approvalOpinion: '',
            createTime: history.createTime,
            censorStaff: history.censorStaffName,
          });
          break;
      }
    });
  }
}
