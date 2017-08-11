import {
  Output,
  Component,
  ViewEncapsulation,
  EventEmitter,
  ViewChild, OnInit
} from '@angular/core';
import {ModalComponent} from "../../../theme/components/ng2-bs4-modal/modal";
import {seerTableComponent} from "../seer_table/seer.table";
import {BaseService} from "../../base.service";
import {CensorHistory} from "../../model/workflow/process-censor-history";
import {SERVER, ORDER_STATE} from "../../const";
import {ProcessNodeConfig} from "../../model/workflow/process-node-config";

/**
 * show a selected date in monthly calendar
 */
@Component({
  selector: 'multi-picker',
  templateUrl: './save-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SaveDialogComponent implements OnInit {

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() destroy: EventEmitter<any> = new EventEmitter();

  orderId: string;
  processKey: string;

  lastRecord: CensorHistory;
  processConfig: ProcessNodeConfig[];

  isStatic:boolean;

  isDraftOnly = false;
  isLastLevel = false;
  canDirect:boolean;
  isDraftNow:boolean;

  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(seerTableComponent) seerTable: seerTableComponent;

  //订单保存类型：有草稿，下一级审批，无需审批直接下一阶段。三种情况
  saveType: 'draft'|'censor'|'direct' = 'draft';
  nextCensorNodeName = '下一级审批';
  ORDER_STATE = ORDER_STATE;
  selectedCensor;

  censorList = [];
  censorTableTitle = [
    {
      key: 'staffName',
      label: '姓名',
    }, {
      key: 'staffOrgName',
      label: '部门',
    }, {
      key: 'staffLevel',
      label: '等级',
      isDict: true
    },
  ];

  public constructor(private service: BaseService<any>) {
  }

  ngOnInit(): void {
    if (!this.processKey) throw new Error('processKey是必须的');

    if (!this.isDraftNow) {
      this.saveType = 'censor';
    }

    this.service.getAll(`${SERVER}/workflow/basic/process/config/${this.processKey}`).then(result => {
      if (result.success) {
        this.processConfig = result.data;
        if (this.processConfig.length == 0) {
          alert('审批流程未配置，只能保存草稿或直接下单');
          this.isDraftOnly = true;
        }
        //如果无orderId 或 有orderId无记录，说明是还没审批过的订单草稿
        if (this.orderId) {
          this.service.getAll(`${SERVER}/workflow/basic/history/${this.orderId}`).then(result => {
            if (result.success) {
              if (result.data.length > 0) {
                this.lastRecord = result.data[result.data.length - 1];
                switch (this.lastRecord.orderState){
                  case ORDER_STATE.BEGIN_PROCESS:{

                    if (this.processConfig.length == 1) {
                      this.isLastLevel = true;
                    }
                    //有下一级审批
                    else {
                      this.nextCensorNodeName = this.processConfig[1].nodeName;
                      this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/2`).then(result => {
                        if (result.success) {
                          this.censorList = result.data;
                        } else {
                          alert(result.message);
                        }
                      });
                    }
                  }
                    break;
                  case ORDER_STATE.VOTING:{
                    if(this.lastRecord.isPassed=='00'){
                      this.nextCensorNodeName = this.processConfig[this.lastRecord.currentNode - 1].nodeName;
                      this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/${this.lastRecord.currentNode}`).then(result => {
                        if (result.success) {
                          this.censorList = result.data;
                        } else {
                          alert(result.message);
                        }
                      })
                    }else if (this.lastRecord.isPassed=='01'){
                      //这次是最后一级
                      if (this.lastRecord.currentNode && this.lastRecord.currentNode == this.lastRecord.totalNode - 1) {
                        this.isLastLevel = true;
                      }else {
                        this.nextCensorNodeName = this.processConfig[this.lastRecord.currentNode+1].nodeName;
                        this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/${this.lastRecord.currentNode+2}`).then(result => {
                          if (result.success) {
                            this.censorList = result.data;
                          } else {
                            alert(result.message);
                          }
                        });
                      }
                    }
                  }
                    break;
                  case ORDER_STATE.VOTE_FAIL:{
                    this.nextCensorNodeName = this.processConfig[0].nodeName;
                    this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/1`).then(result => {
                      if (result.success) {
                        this.censorList = result.data;
                      } else {
                        alert(result.message);
                      }
                    });
                  }
                    break;
                  case ORDER_STATE.RESUBMIT:{
                    if (this.processConfig.length == 1) {
                      this.isLastLevel = true;
                    }
                    //有下一级审批
                    else {
                      this.nextCensorNodeName = this.processConfig[1].nodeName;
                      this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/2`).then(result => {
                        if (result.success) {
                          this.censorList = result.data;
                        } else {
                          alert(result.message);
                        }
                      });
                    }
                  }
                    break;
                }
              }
              //有orderId无记录，只保存了草稿
              else {
                this.nextCensorNodeName = this.processConfig[0].nodeName;
                this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/1`).then(result => {
                  if (result.success) {
                    this.censorList = result.data;
                  } else {
                    alert(result.message);
                  }
                });
              }
            }
            //已经审批过，则不能再被存为草稿，只能再次提交审批
            if (this.lastRecord) {
              this.saveType = 'censor';
            }
          })
        }
        //无orderId，肯定是草稿|一级审批|直接下单
        else {
          this.nextCensorNodeName = this.processConfig[0].nodeName;
          this.service.getAll(`${SERVER}/workflow/basic/staff/process/${this.processKey}/1`).then(result => {
            if (result.success) {
              this.censorList = result.data;
            } else {
              alert(result.message);
            }
          });
        }
      }
    });
  }

  onClickOutside($event) {
    if (!this.isStatic) {
      this.close($event);
    }
  }

  close($event?) {
    if ($event) {
      $event.stopPropagation();
    }
    this.modal.hide();
    setTimeout(() => this.destroy.emit(true), 150);
  }

  onSave() {
    this.save.emit({saveType: this.saveType, selectedCensor: this.selectedCensor});
    this.close();
  }

  onStaffSelect($event) {
    this.selectedCensor = undefined;
    if ($event.type == "single_select") {
      this.selectedCensor = $event.data.id;
      this.seerTable.data.map(item => {
        item['selected'] = false;
      });
      $event.data.selected = true;
    }
  }

  toggleButton(saveType) {
    this.saveType = saveType;
  }
}
