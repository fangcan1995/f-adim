
import {Component, Input, OnChanges, OnInit} from "@angular/core";

import {CommonService} from "../../common.service";

import {FileUploader, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import {getStorage} from "../../../../../theme/libs/utils";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import * as _ from 'lodash';
import {BASE_URL} from "../../../../../theme/services/base.service";
@Component({
  selector: 'audit-material',
  templateUrl: './audit-material.component.html',
  styleUrls: ['./audit-material.component.scss']
})
export class AuditMaterialComponent implements OnInit, OnChanges{

  @Input()
  public disabled: boolean = false;

  @Input()
  public projectId : string;

  @Input()
  public attachments = [];

  public uploader:FileUploader; //上传对象

  public progress: number = 0; //上传进度

  public imageType = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg'];

  constructor(private service: CommonService, private _messageService: SeerMessageService){}

  ngOnInit() {

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

  // 上传
  uploadFile() {
    _.forEach(this.uploader.queue, (t, i) => {
      this.uploader.queue[i].upload(); // 开始上传
    });
  }

  //下载
  private downloadFile(item) {

    let param = {"id": item.id};
    this.service.downloadFile(param).then(res => {
      var blob = res.blob();
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = item.fileName;;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  //删除
  private deleteFile(item, i) {
    this.service.deleteFile(item.id).then( res =>{
      if(0 == res.code) {
        this.attachments.splice(i, 1);
      }else {
        console.log(res.message);
        this.showError(res.message);
      }
    }).catch(err => {
      this.showError( err.msg || '删除文件失败' );
      });
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
