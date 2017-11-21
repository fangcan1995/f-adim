
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";

import {CommonService} from "../../common.service";
import { Location } from '@angular/common';
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'audit-operation',
  templateUrl: './audit-operation.component.html',
  styleUrls: ['./audit-operation.component.scss']
})
export class AuditOperationComponent implements OnInit, OnChanges {

  @Input()
  public projectId: string;

  @Input()
  public loan: any = {};

  public actionType : string = "103" ;

  public comments: string;

  public reason: string = "";

  private nextNodes: any[] = [];

  constructor(
    private service: CommonService,
    private _messageService: SeerMessageService,
    private _router: Router,
    private _location: Location,){}

  ngOnInit() {

  }

  ngOnChanges() {
      if(this.loan != {} && this.loan['taskId'] != undefined) {
        this.getNextNodes(this.loan.taskId);
      }
  }


  //获取下级节点
  public getNextNodes(nodeId) {
      this.service.getNextNodes(nodeId).then(res => {
        if(res.code == 0) {
            this.nextNodes = res.data;
        }else {
          console.log(res.message);
        }
      }).catch(err => {
        this.showError( err.msg || '获取下级审批节点失败' );
      });
  }
  public submit(): void {

    let param = {
      "actionType": this.actionType,
      "comments": this.comments,
      "id": this.loan.projectId,
      "reason": this.reason
    };

    if(this.loan.projectStatus == 10) {
      this.service.completion(param).then(res => {
        if(0 == res.code) {
          //this.showSuccess(res.msg || '已提交');
          this.showSuccess('已提交');
          this.handleBackBtnClick();
        } else {
          //this.showError(res.msg || '提交失败');
          this.showError('提交失败');
          this.handleBackBtnClick();
        }
      }).catch(err => {
        this.showError( err.msg || '提交失败' );
      });
    }else {
      this.service.audit(param).then(res => {
        if(0 == res.code) {
          //this.showSuccess(res.msg || '已提交');
          this.showSuccess('已提交');
          this.handleBackBtnClick();
        } else {
          //this.showError(res.msg || '提交失败');
          this.handleBackBtnClick();
        }
      }).catch(err => {
        this.showError( err.msg || '提交失败' );
      });
    }
  }

  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }

  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }

  handleBackBtnClick() {
    this._location.back();
  }
}
