import {Component, OnInit,OnChanges,Input, ViewChild,TemplateRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SeerDialogService, SeerMessageService,BASE_URL} from '../../../../../theme/services';
import {AdvertisingService} from "../../advertising.service";
import {Location} from "@angular/common";
import {FileUploader, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import {getStorage} from "../../../../../theme/libs/utils";
import {API} from "../../../../../theme/services/base.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";//edit by lily
/*import { TimepickerModule } from 'ngx-bootstrap';*/
import {formatDate} from "ngx-bootstrap/bs-moment/format";

declare let laydate;



import * as _ from 'lodash';
@Component({
  templateUrl: './adver-edit.component.html',
  styleUrls: ['./adver-edit.component.scss']
})
export class AdverEditComponent implements OnInit{
  public advertising: any = {};
  public advertisingId;
  public _editType: string = 'add';
  public uploadDisabled:boolean=false;
  public forbidSaveBtn: boolean = true;

  effectTime;//开始时间
  expiryTime; //结束时间
  //putStatus; //投放状态
  //上传图片相关
  fileApi=`${BASE_URL}/advertisings`; //上传接口

  token = getStorage({ key: 'token' });
  tokenType = this.token.token_type;
  accessToken =this.token.access_token;
  public attachments = [];
  public uploader:FileUploader; //上传对象
  public progress: number = 0; //上传进度
  isLoading:boolean = false;
  @ViewChild('validationForm') validationForm;
  constructor(private _advertisingService: AdvertisingService,
              private _messageService: SeerMessageService,
              private _dialogService: SeerDialogService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private modalService: BsModalService,
              private _location: Location) {
    //表单验证

  }
  ngOnInit() {

    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {
          this.advertisingId=params.id;
          this._advertisingService.getOne(params.id)
            .then(res => {
              this.advertising = res.data || {};
              console.log('广告内容');
              console.log(this.advertising);
              //this.advertising.effectTime = this.advertising.effectTime ? new Date(this.advertising.effectTime.replace(/-/g, "/")) : '';
              //this.advertising.expiryTime = this.advertising.expiryTime ? new Date(this.advertising.expiryTime.replace(/-/g, "/")) : '';

              this.forbidSaveBtn = false;
              // 初始化定义uploader变量,用来配置input中的uploader属性
              let headers = [{name: 'Authorization', value: `${this.tokenType} ${this.accessToken}`}];
              this.uploader = new FileUploader({
                url:`${this.fileApi}/upfile?id=${this.advertisingId}&fileId=${this.advertising.fileId}`,
                method: "POST",
                headers:headers,
              });
              this.uploader.onSuccessItem = this.successItem.bind(this);
              this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
              //end
            }).catch(err => {
            this.showError(err.msg || '获取失败');
          });
        } else if (this._editType === 'add') {

          this.forbidSaveBtn = false;
          // 初始化定义uploader变量,用来配置input中的uploader属性
          let headers = [{name: 'Authorization', value: `${this.tokenType} ${this.accessToken}`}];
          this.uploader = new FileUploader({
            url: `${this.fileApi}/file`,
            method: "POST",
            headers:headers,
          });
          this.uploader.onSuccessItem = this.successItem.bind(this);
          this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
          //end
        }
        //渲染日期时间组件
          laydate.render({
            elem: '#effectTime',
            type: 'datetime',
            done: (value, date, effectTime) => {
              this.advertising.effectTime = value;

            }
          })
          laydate.render({
            elem: '#expiryTime',
            type: 'datetime',
            done: (value, date, expiryTime) => {
              this.advertising.expiryTime = value;
            }
          })
      });

  }
  // 上传
  uploadFile() {
    this.isLoading = true;
    _.forEach(this.uploader.queue, (t, i) => {
      this.uploader.queue[i].upload(); // 开始上传

    });
  }
  //上传成功回调
  successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any{
    if (status == 200) {
      this.isLoading = false;
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      console.log('反回的数据');
      console.log(tempRes);

      //this.advertising.icon=tempRes.data.uploadPath; //新的图片地址
      this.attachments.push(tempRes.data);
      let fileLength = this.uploader.queue.length;
      this.progress += Math.round(100/fileLength);

      //唯一图片场景下
      let attachmentsNum=this.attachments.length-1;
      if(!this.attachments[attachmentsNum]){
        this.showError('上传失败');
      }else{
        this.advertising.icon=this.attachments[attachmentsNum].uploadPath;
        if (this._editType === 'edit') {
          this.advertising.newFileId=tempRes.data.id; //新图片的文件id //编辑
        }else{
          this.advertising.fileId=this.attachments[attachmentsNum].id;  //新增
        }
      }

      //
    }else {
      this.isLoading = false;
      // 上传文件后获取服务器返回的数据错误
      this.showError("上传失败！")
    }
  }
  //全部上传完成回调
  onCompleteAll(): any {
    this.uploader.clearQueue();
    this.progress = 0;
  }
  //返回
  handleBackBtnClick() {
    if(this.validationForm.dirty){
      this._dialogService.confirm('还未保存确认要离开吗？')
        .subscribe(action => {
          if(action === 1) {
            this._location.back();
          }
        }) ;
    }else{
      this._location.back();
    }
  }
  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;

    //let requestStream$;
    if (this._editType === 'edit') {
      this.forbidSaveBtn=true;
      let advertisingNew=_.cloneDeep(this.advertising);
      console.log('----要提交的数据是-----');
      console.log(advertisingNew);
      //advertisingNew.effectTime=formatDate(advertisingNew.effectTime,'YYYY-MM-DD hh:mm:ss');
      //advertisingNew.expiryTime=formatDate(advertisingNew.expiryTime,'YYYY-MM-DD hh:mm:ss');

      this._advertisingService.putOne(advertisingNew.id, advertisingNew).then(data=>{
        this.forbidSaveBtn = true;
        this.showSuccess(data.msg || '更新成功').onClose()
          .subscribe(() => {
            this._router.navigate(['/adver-manage/advertising/']);
          });
      }).catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '更新失败');
      });
    } else if (this._editType === 'add') {

      this.forbidSaveBtn=true;
      let advertisingNew=_.cloneDeep(this.advertising);
      //advertisingNew.effectTime=formatDate(advertisingNew.effectTime,'YYYY-MM-DD hh:mm:ss');
      //advertisingNew.expiryTime=formatDate(advertisingNew.expiryTime,'YYYY-MM-DD hh:mm:ss');

      this._advertisingService.postOne(advertisingNew).then((data:any) => {
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
