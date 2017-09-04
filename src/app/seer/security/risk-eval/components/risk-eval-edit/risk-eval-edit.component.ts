import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { RiskEvalService } from "../../risk-eval.service";
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
@Component({
  templateUrl: './risk-eval-edit.component.html',
  styleUrls: ['./risk-eval-edit.component.scss']
})
export class RiskEvalEditComponent implements OnInit {
  public riskEval: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  constructor(
    private _riskEvalService: RiskEvalService,
    private _messageService: SeerMessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {}
  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
      .subscribe(params => {
        if ( this._editType === 'edit' ) {
          console.log(params.id)
          this._riskEvalService.getOne(params.id)
            .subscribe(res => {
              this.riskEval = res.data || {};

              this.forbidSaveBtn = false;
            }, errMsg => {
              // 错误处理的正确打开方式
              this._messageService.open({
                icon: 'fa fa-times-circle',
                message: errMsg,
                autoHideDuration: 3000,
              }).onClose().subscribe(() => {
                this._location.back()
              })
            })
        } else if ( this._editType === 'add' ) {
          this.forbidSaveBtn = false;
        }
      })
  }
  handleBackBtnClick() {
    this._location.back()
  }
  handleSaveBtnClick() {
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if ( this._editType === 'edit' ) {
      requestStream$ = this._riskEvalService.putOne(this.riskEval.id, this.riskEval)
    } else if ( this._editType === 'add' ) {
      requestStream$ = this._riskEvalService.postOne(this.riskEval)
    } else {
      return;
    }
    requestStream$
      .subscribe(res => {
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: res.msg,
          autoHideDuration: 3000,
        }).onClose().subscribe(() => {
          this._router.navigate(['/seer/security/risk-eval'])
        });
      }, errMsg => {
        this.forbidSaveBtn = false;
        // 错误处理的正确打开方式
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: errMsg,
          autoHideDuration: 3000,
        })
      })

  }

}
