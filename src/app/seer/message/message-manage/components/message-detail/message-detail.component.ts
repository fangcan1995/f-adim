import {Component,OnInit,TemplateRef} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params,Router} from "@angular/router";
import {MessageService} from "../../message.service";
import {GlobalState} from "../../../../../global.state";
import { BsModalService} from 'ngx-bootstrap/modal';
import {SeerMessageService,} from '../../../../../theme/services';
import * as _ from 'lodash';
@Component({
  selector: 'message-edit',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent {

  message:any = {};
  title : string;
  editId: string;

  modalUsers=[];
  modelTitles= [
    {key: 'name', label: '姓名', hidden: false},
    {key: 'loginName', label: '账号', hidden: false},
    {key: 'phone', label: '联系方式', hidden: false},
    {key: 'mailResult', label: '消息中心',isDict:true,category:"MSG_STATUS"},
    {key: 'notifyResult', label: '推送',isDict:true,category:"MSG_STATUS"},
    {key: 'messageResult', label: '短信',isDict:true,category:"MSG_STATUS"},
  ];
  modalPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":""
  }; //分页、排序、检索
  constructor(
    private location: Location ,
    private _route: ActivatedRoute,
    private _router: Router,
    private service: MessageService,
    private _messageService: SeerMessageService,
    private gs:GlobalState,
    private modalService: BsModalService){
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.editId = params['id'];
    })

    this.title = '查看消息';
    this.service.getMessageById(this.editId).then((data) => {
      this.message = data.data;

      /*this.getDicts("adaptationUser","ADAPTATION_USER","message");
      this.getDicts("businessType","BUSINESS_TYPE","message");*/
    });
    this.getRecordList();

  }

  //获取列表
  getRecordList(){
    this.service.getRecords(this.editId,this.modalPageInfo).then((data)=>{
      this.modalPageInfo.pageNum=data.data.pageNum;  //当前页
      this.modalPageInfo.pageSize=data.data.pageSize; //每页记录数
      this.modalPageInfo.total=data.data.total; //记录总数
      this.modalUsers=data.data.list;
    }).catch(err => {
      this.showError(err.msg || '连接失败');
    });
  }

  //模态框换页
  modalPageChange($event){
    this.modalPageInfo.pageSize = $event.pageSize;
    this.modalPageInfo.pageNum=$event.pageNum;
    this.getRecordList();
  }
  //返回
  handleBackBtnClick() {
    this.location.back()
  }

  //成功提示
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }

  //失败提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
//用字典过滤数据,fieldName字段名，category字典key，obj输出到哪个对象
  /*getDicts(fieldName,category,obj): void {
    this.service.getDictTranslate([{"fieldName": fieldName,"category": category}]).then(res =>{
      let item=_.cloneDeep(res.data[fieldName]);
      if(res.code==0) {
        let index=item.findIndex(x => x.itemId == this[obj][fieldName]);
        if(index!=-1){
          this[obj][fieldName]=item[index].itemName;
          //console.log(this[obj][fieldName]);
        }
      }
    });
  }*/
}
