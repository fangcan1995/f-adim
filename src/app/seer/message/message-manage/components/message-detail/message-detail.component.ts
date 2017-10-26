import {Component,OnInit,TemplateRef} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params,Router} from "@angular/router";
import {MessageService} from "../../message.service";
import {Message} from "../../../../model/auth/message-edit";
import {Result} from "../../../../model/result.class";
import {GlobalState} from "../../../../../global.state";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import {errorObject} from "rxjs/util/errorObject";

@Component({
  selector: 'message-edit',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent {

  private message:any={};
  title : string;
  editId: string;
  usersType: string; //用户类型
  modalUsers=[];
  modelTitles= [
    {key: 'aaa', label: '用户名', hidden: false},
    {key: 'bbb', label: '真实姓名', hidden: false},
    {key: 'ccc', label: '手机号', hidden: false},
    {key: 'ddd', label: '身份证号', hidden: false},
  ];
  modalPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"-entryTime",
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
  }

  //模态框分页事件
  modalPageChange(){
    alert('换页数');
  }
  //返回
  handleBackBtnClick() {
    this.location.back()
  }
  //模态框
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.service.getUsers(this.usersType).then(res => {
      this.modalUsers = res.data.list;
    });
  }

}
