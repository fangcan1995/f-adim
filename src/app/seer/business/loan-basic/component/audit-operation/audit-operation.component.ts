
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";

import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'audit-operation',
  templateUrl: './audit-operation.component.html',
  styleUrls: ['./audit-operation.component.scss']
})
export class AuditOperationComponent implements OnInit {

  @Input()
  private projectId: string;

  @Input()
  private loan: any = {};

  private actionType : string = "103" ;

  private comments: string;

  private reason: string = "";

  constructor(private service: LoanBasicService, private _messageService: SeerMessageService, private _router: Router,){}

  ngOnInit() {

  }

  private submit(): void {

    let param = {
      "actionType": this.actionType,
      "comments": this.comments,
      "id": this.loan.projectId,
      "reason": this.reason
    };

    if(this.loan.projectStatus == 10) {
      this.service.completion(param).then(res => {
        console.log(res);
        if(0 == res.code) {
          this.showSuccess(res.msg || '已提交');
          this._router.navigate(['business/intention']);
        } else {
          this.showError(res.msg || '提交失败');
        }
      });
    }else {
      this.service.audit(param).then(res => {
        if(0 == res.code) {
          this.showSuccess(res.msg || '已提交');
          this._router.navigate(['business/intention']);
        } else {
          this.showError(res.msg || '提交失败');
        }
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
}
