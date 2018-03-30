import {Component, OnInit,OnChanges,Input, ViewChild,TemplateRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {AdvertisingService} from "../../advertising.service";
import {Location} from "@angular/common";
import {FileUploader, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import {getStorage} from "../../../../../theme/libs/utils";
import {BASE_URL,API} from "../../../../../theme/services/base.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";//edit by lily
/*import { TimepickerModule } from 'ngx-bootstrap';*/



import * as _ from 'lodash';
@Component({
  templateUrl: './adver-detail.component.html',
  styleUrls: ['./adver-detail.component.scss']
})
export class AdverDetailComponent implements OnInit{
  public advertising: any = {};
  public advertisingId;
  public _editType: string = 'add';
  public uploadDisabled:boolean=false;
  public forbidSaveBtn: boolean = true;

  effectTime;//开始时间
  expiryTime; //结束时间
  //putStatus; //投放状态
  //上传图片相关

  fileApi=`${BASE_URL}/${API['ADVERTISINGS']}`; //上传接口
  token = getStorage({ key: 'token' });
  tokenType = this.token.token_type;
  accessToken =this.token.access_token;
  public attachments = [];
  public uploader:FileUploader; //上传对象
  public progress: number = 0; //上传进度
  @ViewChild('validationForm') validationForm;
  constructor(private _advertisingService: AdvertisingService,
              private _messageService: SeerMessageService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private modalService: BsModalService,
              private _location: Location) {

  }
  ngOnInit() {

    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'detail') {
          this.advertisingId=params.id;
          this._advertisingService.getOne(params.id)
            .then(res => {
              this.advertising = res.data || {};
              //console.log(this.advertising);
              this.forbidSaveBtn = false;

            }).catch(err => {
            this.showError(err.msg || '获取失败');
          });
        }
      });

  }



  handleBackBtnClick() {
    this._location.back()
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
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
