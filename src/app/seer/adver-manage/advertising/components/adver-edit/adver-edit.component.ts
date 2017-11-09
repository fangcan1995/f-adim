import {Component, OnInit,OnChanges,Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {AdvertisingService} from "../../advertising.service";
import {Location} from "@angular/common";
import {FileUploader, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import {getStorage} from "../../../../../theme/libs/utils";
import {BASE_URL} from "../../../../../theme/services/base.service";
import * as _ from 'lodash';
@Component({
  templateUrl: './adver-edit.component.html',
  styleUrls: ['./adver-edit.component.scss']
})
export class AdverEditComponent implements OnInit, OnChanges{
  @Input()
  public disabled: boolean = false;

  @Input()
  public projectId : string;

  @Input()
  public attachments = [];


  public advertising: any = {};
  public _editType: string = 'add';
  public uploadDisabled:boolean=false;
  public forbidSaveBtn: boolean = true;

  public uploader:FileUploader; //上传对象
  public progress: number = 0; //上传进度
  public imageType = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg'];  //图片类型


  constructor(private _advertisingService: AdvertisingService,
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
          //console.log(params.id);
          this._advertisingService.getOne(params.id)
            .then(res => {
              this.advertising = res.data || {};
              this.forbidSaveBtn = false;
              console.log('---------------');
              console.log(this.advertising);
            }).catch(err => {
            this.showError(err.json().message || '获取失败');
          });
        } else if (this._editType === 'add') {
          this.forbidSaveBtn = false;
        }
      });

    // 初始化定义uploader变量,用来配置input中的uploader属性
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    let headers = [{name: 'Authorization', value: `${tokenType} ${accessToken}`}];
    this.uploader = new FileUploader({
      url: BASE_URL + "/subject/intentions/file/" + this.projectId,
      method: "POST",
      headers:headers,
    });

    this.uploader.onSuccessItem = this.successItem.bind(this);
    this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
  }

  handleBackBtnClick() {
    this._location.back()
  }

  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    //let requestStream$;
    if (this._editType === 'edit') {
      console.log(this.advertising);
      this._advertisingService.putOne(this.advertising.id, this.advertising).then(data=>{
        this.forbidSaveBtn = false;
        this.showSuccess(data.msg || '更新成功').onClose()
          .subscribe(() => {
            this._router.navigate(['/adver-manage/advertising/']);
          });
      }).catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '更新失败');
      });
    } else if (this._editType === 'add') {
      this._advertisingService.postOne(this.advertising).then((data:any) => {
        this.forbidSaveBtn = false;
        this.showSuccess(data.msg || '保存成功').onClose()
          .subscribe(() => {
            this._router.navigate(['/adver-manage/advertising/']);
          });
      }).catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '保存失败');
      });
    } else {
      return;
    }
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

  ngOnChanges() {

    // 初始化定义uploader变量,用来配置input中的uploader属性
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    let headers = [{name: 'Authorization', value: `${tokenType} ${accessToken}`}];
    this.uploader = new FileUploader({
      url: BASE_URL + "/subject/intentions/file/" + this.projectId,
      method: "POST",
      headers:headers,
    });

    this.uploader.onSuccessItem = this.successItem.bind(this);
    this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
  }
  // 上传
  //下载
  /*public downloadFile(param: any): Promise<any> {
    let url = BASE_URL + `/tool/files/download?id=${param.id}`
    return this._http.get(url, new RequestOptions({
      responseType: ResponseContentType.Blob
    })).toPromise();
  }*/
  uploadFile() {
    alert('1');
    _.forEach(this.uploader.queue, (t, i) => {
      this.uploader.queue[i].upload(); // 开始上传
    });
  }
  //上传成功回调
  successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any{

    if (status == 200) {
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      this.attachments.push(tempRes.data);
      let fileLength = this.uploader.queue.length;
      this.progress += Math.round(100/fileLength);
      //this.showSuccess("上传成功！")
    }else {
      // 上传文件后获取服务器返回的数据错误
      console.log("上传失败");
      this.showError("上传失败！")
    }
  }
  //全部上传完成回调
  onCompleteAll(): any {
    this.uploader.clearQueue();
    this.progress = 0;
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
}
