
import {Component, Input, OnChanges, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {FileUploader, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import {getStorage} from "../../../../../theme/libs/utils";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import * as _ from 'lodash';
@Component({
  selector: 'audit-material',
  templateUrl: './audit-material.component.html',
  styleUrls: ['./audit-material.component.scss']
})
export class AuditMaterialComponent implements OnInit, OnChanges{

  @Input()
  private disabled: boolean = false;

  @Input()
  private projectId : string;

  @Input() attachments = [];

  public actions = [ UPDATE ]

  public uploader:FileUploader;

  private imageType = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg'];

  constructor(private service: LoanBasicService, private _messageService: SeerMessageService){}

  ngOnInit() {
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    let headers = [{name: 'Authorization', value: `${tokenType} ${accessToken}`}];

    // B: 初始化定义uploader变量,用来配置input中的uploader属性
    this.uploader = new FileUploader({
      url: "http://172.16.7.4:8020/subject/intentions/file/" + this.projectId,
      method: "POST",
      headers:headers,
    });

    this.uploader.onSuccessItem = this.successItem.bind(this);
  }

  ngOnChanges() {
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    let headers = [{name: 'Authorization', value: `${tokenType} ${accessToken}`}];

    // B: 初始化定义uploader变量,用来配置input中的uploader属性
    this.uploader = new FileUploader({
      url: "http://172.16.7.4:8020/subject/intentions/file/" + this.projectId,
      method: "POST",
      headers:headers,
      removeAfterUpload:true
      //maxFileSize:
    });

    this.uploader.onSuccessItem = this.successItem.bind(this);
  }

  // C: 定义事件，选择文件
  selectedFileOnChanged(event:any) {
    this.uploadFile();
  }

  uploadFile() {
    // 上传
    _.forEach(this.uploader.queue, (t, i) => {
      this.uploader.queue[i].upload(); // 开始上传
    });
  }

  successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any{
    // 上传文件成功
    if (status == 200) {
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      this.attachments.push(tempRes.data);
      //this.showSuccess("上传成功！")
    }else {
      // 上传文件后获取服务器返回的数据错误
      console.log("上传失败");
      this.showError("上传失败！")
    }
  }

  private downloadFile(item) {
    let param = {"id": item.id};

    this.service.downloadFile(param)
    .then(res => res.blob())
    .then(blob => {
      // var blob = new Blob([res]);
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = item.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  private deleteFile(item, i) {
    this.service.deleteFile(item.id).then( res =>{
      if(0 == res.code) {
        this.attachments.splice(i, 1);
      }else {
        console.log(res.message);
        this.showError(res.message);
      }
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
