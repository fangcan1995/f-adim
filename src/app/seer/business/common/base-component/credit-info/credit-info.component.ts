
import {Component, Input, OnChanges, OnInit} from "@angular/core";

import {CommonService} from "../../common.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
import * as _ from 'lodash';
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
@Component({
  selector: 'credit-info',
  templateUrl: './credit-info.component.html',
  styleUrls: ['./credit-info.component.scss']
})
export class CreditInfoComponent implements OnInit, OnChanges {

  @Input()
  public disabled: boolean = false;

  @Input()
  public credits: any[] = [];

  public riskReport:any = {};

  public creditReport:any = {};

  public antiFraudReport:any = {};

  public actions = [ SAVE ];

  public creditReportType = [];

  constructor(private service: CommonService , private _messageService: SeerMessageService,){}

  ngOnInit() {
    if(!this.disabled) { this.actions = [ SAVE ]; } else {this.actions = []; }
  }

  ngOnChanges(): void {

    //获取字典
    let dict = [{"fieldName": "creditReportType","category": "CREDIT_REPORT_TYPE"}];
    this.service.getDictTranslate(dict).then(res =>{
      this.creditReportType = res.data.creditReportType;
    });

    _.forEach(this.credits, (t, i) => {
      if("1" == t.creditType) {
        this.riskReport = t;
      }
      else if("2" == t.creditType) {
        this.creditReport = t;
      }

      else if("3" == t.creditType) {
        this.antiFraudReport = t;
      }
    });
  }

  public preview(param):void {

  }

  public download(param):void {
    console.log(param + ",TODO");
  }

  public query(param, creditType):void {
    this.service.getMemberCredit(param.memberId, creditType).then(res => {
      if(0 == res.code) {
        //this.showSuccess(res.msg || '保存成功');
        this.showSuccess('查询成功');
      } else {
        //this.showError(res.msg || '查询失败');
        this.showError('查询失败');
      }
    });
  }

  public requery(param):void {
    console.log(param + ",TODO");
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
