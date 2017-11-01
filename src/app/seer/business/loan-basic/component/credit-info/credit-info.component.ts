
import {Component, Input, OnChanges, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
import * as _ from 'lodash';
@Component({
  selector: 'credit-info',
  templateUrl: './credit-info.component.html',
  styleUrls: ['./credit-info.component.scss']
})
export class CreditInfoComponent implements OnInit, OnChanges {

  @Input()
  private disabled: boolean = false;

  @Input()
  private credits: any[] = [];

  private riskReport = {};

  private creditReport = {};

  private antiFraudReport = {};

  private actions = [ SAVE ];

  private creditReportType = [];

  constructor(private service: LoanBasicService){}

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

  private preview(param):void {
      console.log(param + ",TODO");
  }

  private download(param):void {
    console.log(param + ",TODO");
  }

  private query(param):void {
    console.log(param + ",TODO");
  }

  private requery(param):void {
    console.log(param + ",TODO");
  }

}
