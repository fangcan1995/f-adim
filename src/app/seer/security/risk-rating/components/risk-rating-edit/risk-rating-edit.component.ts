import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RiskRatingService} from "../../risk-rating.service";
import {SeerMessageService} from '../../../../../theme/services/seer-message.service';

@Component({
  templateUrl: './risk-rating-edit.component.html',
  styleUrls: ['./risk-rating-edit.component.scss']
})
export class RiskRatingEditComponent implements OnInit {

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
      if (this._editType === 'edit') {
        this._riskRatingService.getOne(params.id).then(res => {
          this.riskRating = res.data || {};
          this.forbidSaveBtn = false;
        }).catch(err => {
          this.alertError(err.json().message);
          this._location.back();
        });
      } else if (this._editType === 'add') {
        this.riskRating.investGrade = '';
        this.forbidSaveBtn = false;
      }
    })
  }

  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    //console.log(this.riskRating);
    if (this._editType === 'edit') {
      this._riskRatingService.putOne(this.riskRating).then(res => {
        if (res.code == '0') {
          this.alertSuccess(res.message);
        } else {
          this.alertError(res.message);
        }
      }).catch(err => {
        this.alertError(err.json().message);
      });
    } else if (this._editType === 'add') {
      this._riskRatingService.postOne(this.riskRating).then(res => {
        if (res.code == '0') {
          this.alertSuccess(res.message);
        } else {
          this.alertError(res.message);
        }
      }).catch(err => {
        this.alertError(err.json().message);
      });
    } else {
      return;
    }
  }

  handleBackBtnClick() {
    this._location.back()
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/security/risk-rating/'])
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
