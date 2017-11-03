import {Component, OnDestroy, OnInit} from "@angular/core";
import {AnnouncementService} from "../../announcement.service";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.scss']
})
export class AnnouncementEditComponent implements OnInit, OnDestroy {

  public announcement: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  constructor(private _announcementService: AnnouncementService,
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
          this._announcementService.getOne(params.id)
            .then(res => {
              this.announcement = res.data;
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
    /*if (this._editType === 'edit') {
      //requestStream$ = this._announcementService.putOne(this.announcement.id, this.announcement);
      requestStream$ = this._announcementService.putOne(this.announcement)
        .then(data => {
          if(data.code === '0') {
            this.alertSuccess(data.message);
          }
          else {
            this.alertError(data.message);
          }
        }).catch(err => {
          this.alertError(err.json().message);
        });
    } else if (this._editType === 'add') {
      requestStream$ = this._announcementService.putOne(this.announcement)
        .then( data => {
          if(data.code === '0') {
            this.alertSuccess(data.message);
          }
          else {
            this.alertError(data.message);
          }
        }).catch(err => {
          this.alertError(err.json().message);
        });
    } else {
      return;
    }*/
    if (this._editType === 'add') {
      let { effectTime } = this.announcement;
      this.announcement.effectTime = effectTime ? (formatDate(effectTime,'YYYY-MM-DD 00:00:00')) : null;
    }
    requestStream$ = this._announcementService.putOne(this.announcement)
      .then(data => {
        if(data.code === '0') {
          this.alertSuccess(data.message);
        }
        else {
          this.alertError(data.message);
        }
      }).catch(err => {
        this.alertError(err.json().message);
      });

    /*requestStream$
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
      })*/

  }

  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/content/announcement/'])
    });
  };
  alertError(errMsg:string){
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  };

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

}
