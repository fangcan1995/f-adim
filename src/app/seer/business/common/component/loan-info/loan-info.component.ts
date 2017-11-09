
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";

import {CommonService} from "../../common.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";

@Component({
  selector: 'loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss']
})
export class LoanInfoComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  private disabled: boolean = false;

  @Input() loan = {};

  private actions = [];

  @Output() notify: EventEmitter<any> = new EventEmitter();

  constructor(private service: CommonService, private _messageService: SeerMessageService,){}

  ngOnInit(): void {
    if(!this.disabled) { this.actions = [ SAVE ] } else { this.actions = [] }

  }

  ngOnChanges() {

    //初审、复审时
    if( undefined != this.loan['projectStatus'] && this.loan['projectStatus'] != 10) {
      //设置借款类型禁用
      document.getElementById("loanApplyType").setAttribute("disabled", "disabled");
      //设置项目名称禁用
      document.getElementById("projectName").setAttribute("disabled", "disabled");
      //设置还款方式禁用
      document.getElementById("repayType").setAttribute("disabled", "disabled");
      //设置手续费禁用
      document.getElementById("serviceRate").setAttribute("disabled", "disabled");
      //设置还款来源禁用
      document.getElementById("repayFrom").setAttribute("disabled", "disabled");
    }

  }

  ngAfterViewInit() {

  }

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
