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
  templateUrl: './risk-eval-edit.component.html',
  styleUrls: ['./risk-eval-edit.component.scss']
})
export class RiskEvalEditComponent implements OnInit {

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
      if (this._editType === 'edit') {
        this.riskEvalId = params.id;
        this._riskEvalService.getOne(params.id)
          .then(res => {
            this.riskEval = res.data || {};
            this.forbidSaveBtn = false;
          })
          .catch(err => {
            this.alertError(err.json().message);
          })

      } else if (this._editType === 'add') {
        this.forbidSaveBtn = false;
      }
    })
  }

  //修改题目
  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    if (this._editType === 'edit') {
      //编辑题目保存的处理
      this._riskEvalService.putOne(this.riskEval).then(data => {
        if (data.code == "0") {
          this.alertSuccess(data.message);
        } else {
          this.alertError(data.message);
        }
      });
    } else if (this._editType === 'add') {
      //新增题目保存的处理
      this._riskEvalService.postOne(this.riskEval).then(data => {
        if (data.code == "0") {
          this.alertSuccess(data.message);
        } else {
          this.alertError(data.message);
        }
      })
    } else {
      return;
    }
  }

  //返回
  handleBackBtnClick() {
    this._location.back()
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa-check',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/security/risk-eval/'])
    });
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
