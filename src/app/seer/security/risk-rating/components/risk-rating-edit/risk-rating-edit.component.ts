import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { RiskRatingService } from "../../risk-rating.service";
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
@Component({
  templateUrl: './risk-rating-edit.component.html',
  styleUrls: ['./risk-rating-edit.component.scss']
})
export class RiskRatingEditComponent implements OnInit {
  public riskRating: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  constructor(
    private _riskRatingService: RiskRatingService,
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
          this._riskRatingService.getOne(params.id)
            .subscribe(res => {
              this.riskRating = res.data || {};

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
      requestStream$ = this._riskRatingService.putOne(this.riskRating.id, this.riskRating)
    } else if ( this._editType === 'add' ) {
      requestStream$ = this._riskRatingService.postOne(this.riskRating)
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
          this._router.navigate(['/seer/security/risk-rating'])
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
