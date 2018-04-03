import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RiskRatingService} from "../../risk-rating.service";
import {SeerMessageService} from '../../../../../theme/services/seer-message.service';

@Component({
  templateUrl: './risk-rating-detail.component.html',
  styleUrls: ['./risk-rating-detail.component.scss']
})
export class RiskRatingDetailComponent implements OnInit {

  public riskRating: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;

  constructor(private _riskRatingService: RiskRatingService,
              private _messageService: SeerMessageService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location,) {
  }

  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._route.params
    }).subscribe(params => {
      if (this._editType === 'detail') {
        this._riskRatingService.getOne(params.id).then(res => {
          this.riskRating = res.data || {};
          this.forbidSaveBtn = false;
        }).catch(err => {
          this.alertError(err.json().message);
          this._location.back();
        });
      }
    })
  }



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
