import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import {Location} from '@angular/common';

import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {RiskEvalService} from "../../risk-eval.service";
import {SeerMessageService} from '../../../../../theme/services/seer-message.service';
import {UPDATE, DELETE} from '../../../../common/seer-table/seer-table.actions';

@Component({
  templateUrl: './risk-eval-detail.component.html',
  styleUrls: ['./risk-eval-detail.component.scss']
})
export class RiskEvalDetailComponent implements OnInit {

  public riskEval: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  riskEvalId: string;

  constructor(private _riskEvalService: RiskEvalService,
              private _messageService: SeerMessageService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location,) {
  }

  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    }).subscribe(params => {
      if (this._editType === 'detail') {
        this.riskEvalId = params.id;
        this._riskEvalService.getOne(params.id)
          .then(res => {
            this.riskEval = res.data || {};
            this.forbidSaveBtn = false;
          })
          .catch(err => {
            this.alertError(err.json().message);
          })

      }
    })
  }



  //返回
  handleBackBtnClick() {
    this._location.back()
  }



  alertError(errMsg: string) {
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  }
}
