
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";

@Component({
  selector: 'loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss']
})
export class LoanInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input() loan = {};

  private actions = [];

  @Output() notify: EventEmitter<any> = new EventEmitter();

  constructor(private service: LoanBasicService, private _messageService: SeerMessageService,){}

  ngOnInit(): void { if(!this.disabled) { this.actions = [ SAVE ] } else { this.actions = [] } }


  //保存借款信息
  private save(): void {
    this.service.updateLoan(this.loan).then((res => {
      if(0 == res.code) {
        this.showSuccess(res.msg || '保存成功');
      } else {
        this.showError(res.msg || '保存失败');
      }
    }));
  }

  //借款类型改变通知
  private loanTypeChange() {
    this.notify.emit(this.loan['loanApplyType']);

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
