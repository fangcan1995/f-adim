
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";

import {CommonService} from "../../common.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";

@Component({
  selector: 'loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss']
})
export class LoanInfoComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  public disabled: boolean = false;

  @Input() loan:any = {};

  public actions = [];

  @Output() notify: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private service: CommonService, private _messageService: SeerMessageService,){

    //表单验证
    this.form = new FormGroup({

      //借款类型
      loanApplyType: new FormControl('', CustomValidators.min(0)),

      //借款金额
      applyAmt: new FormControl('', CustomValidators.min(100)),

      //借款期限
      loanApplyExpiry: new FormControl('', CustomValidators.min(0)),

      //年利率
      rate: new FormControl('', CustomValidators.min(0.01)),

      //还款方式
      repayType: new FormControl('', CustomValidators.min(0)),

      //借款用途

      //服务费
      serviceRate: new FormControl('', CustomValidators.min(0.01)),
    });

  }

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
  public save(): void {

    //提交验证
    if(!this.form.valid) {

      this.showError("请按规则填写表单");

    }else {

      this.service.updateLoan(this.loan).then((res => {
        if (0 == res.code) {
          this.showSuccess(res.msg || '保存成功');
        } else {
          this.showError(res.msg || '保存失败');
        }
      })).catch(err => {
        this.showError(err.msg || '保存失败');
      });
    }

  }

  //借款类型改变通知
  public loanTypeChange() {
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
