import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivityService} from "../../activity.service";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";

@Component({
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  public activity: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;

  constructor(private _activityService: ActivityService,
              private _messageService: SeerMessageService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _location: Location) {
  }

  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {
          console.log(params.id);
          this._activityService.getOne(params.id)
            .subscribe(res => {
              this.activity = res.data || {};
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
        } else if (this._editType === 'add') {
          this.forbidSaveBtn = false;
        }
      })
  }

  handleBackBtnClick() {
    this._location.back()
  }

  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if (this._editType === 'edit') {
      requestStream$ = this._activityService.putOne(this.activity.id, this.activity)
    } else if (this._editType === 'add') {
      requestStream$ = this._activityService.postOne(this.activity)
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
          this._router.navigate(['/seer/basic-info/member'])
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
