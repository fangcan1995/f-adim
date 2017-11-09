import {Component,OnInit,TemplateRef} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params,Router} from "@angular/router";
import {MessageService} from "../../message.service";
import {GlobalState} from "../../../../../global.state";
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import {SeerDialogService, SeerMessageService,} from '../../../../../theme/services';

@Component({
  selector: 'message-edit',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent {

  message:any = {};
  title : string;
  editId: string;
  usersType: string; //用户类型
  modalUsers=[];
  modelTitles= [
    {key: 'name', label: '会员姓名', hidden: false},
    {key: 'loginName', label: '会员账号', hidden: false},
    {key: 'phone', label: '联系方式', hidden: false},
    {key: 'mailResult', label: '消息中心',isDict:true,category:"MSG_STATUS"},
    {key: 'notifyResult', label: '推送',isDict:true,category:"MSG_STATUS"},
    {key: 'messageResult', label: '短信',isDict:true,category:"MSG_STATUS"},
  ];
  modalPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "query":{
    },

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
    });
    this.getRecordList();
  }

  getRecordList(){
    this.service.getRecords(this.editId,this.modalPageInfo).then((data)=>{
      this.modalPageInfo.pageNum=data.data.pageNum;  //当前页
      this.modalPageInfo.pageSize=data.data.pageSize; //每页记录数
      this.modalPageInfo.total=data.data.total; //记录总数
      this.modalUsers=data.data.list;
    }).catch(err => {
      this.showError(err.json().message || '连接失败');
    });
  }
  //模态框分页事件
  modalPageChange($event){
    this.modalPageInfo.pageSize = $event.pageSize;
    this.modalPageInfo.pageNum=$event.pageNum;
    this.getRecordList();
  }
  //返回
  handleBackBtnClick() {
    this.location.back()
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
  selectUsersType() {
    
  }
}
