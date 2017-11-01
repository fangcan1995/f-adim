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
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  /*hasGlobalFilter = true;
  filters = [
    {
      key: 'bbb',
      label: '用户身份',
      type: 'select',
      options:[{value:'', content: '全部'},{value:'1', content: '前台用户'},{value:'2', content: '后台员工'}]
    },
    {
      key: 'bbb',
      label: '年龄',
      type: 'input.text',
    },
    {
      key: 'bbb',
      label: '-',
      type: 'input.text',
    },
    {
      key: 'ddd',
      label: '消息类型',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key: 'sendNotify',
      label: '消息中心',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key: 'sendMessage',
      label: '短信通知',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key:'ggg',
      label:'推送通知',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key:'TimeStart',
      label:'下发时间',
      type: 'datepicker',
    },
    {
      key:'TimeEnd',
      label:'至',
      type: 'datepicker',
    },
    {
      key:'ggg',
      label:'消息简介',
      type: 'input.text',
    },
  ];*/
  private message:any={};
  title : string;
  isAdd: boolean;
  editId: string;
  isPickUsersAble:boolean=true;  //选择用户按钮无效
  usersType: string; //用户类型
  IsChecked={"sendMail":false,"sendNotify":false,"sendMessage":false,"now":false}
  disabled={"sendMail":true,"sendNotify":true,"sendMessage":true,"now":false}; checkbox是否可用
  allowChange:boolean=false;//date-picker是否可用
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;

  modalUsers=[];
  modalActionSet = {
    'SEARCH': {
      'type': 'search',
      'name': '查询',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'OK': {
      'type': 'ok',
      'name': '确定',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'All': {
      'type': 'all',
      'name': '全选',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    }
  };
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
      "aaa":"",
      "bbb":"",
      "sendMail":"",
      "sendNotify":"",
      "sendMessage":"",
      "TimeStart":"",
      "TimeEnd":"",
      "ggg":""
    },

  }; //分页、排序、检索
  cardActions1 = [this.modalActionSet.SEARCH];
  cardActions2 = [this.modalActionSet.All,this.modalActionSet.OK];

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
      this.isAdd = !this.editId;
      this.isPickUsersAble=true;
    })

    this.title = this.isAdd ? '新建消息' : '修改消息';
    this.forbidSaveBtn=false;
    if(!this.isAdd) {
      //this.getResourceById(this.editId);
      this._editType='edit';
      this.isPickUsersAble=false;
      this.service.getMessageById(this.editId).then((data) => {
        this.message = data.data;
        if(this.message.adaptationUser=="backend"){
          this.disabled={"sendMail":true,"sendNotify":true,"sendMessage":false,"now":false}
        }
      });
    }else {
      this.isPickUsersAble=false;

    };
  }
  //激活选择用户按钮
  selectUsersType(userTypeId){
    //要判断是否选择，并判断选中了前台用户还是后台用户
    if(userTypeId=='0'){
      this.isPickUsersAble=false;
      this.disabled.sendMail=false;
      this.disabled.sendNotify=false;
      this.disabled.sendMessage=false;
      this.usersType="members"
    }else if(userTypeId=='1'){
      this.isPickUsersAble=false;
      this.disabled.sendMail=true;
      this.disabled.sendNotify=true;
      this.disabled.sendMessage=false;
      this.usersType="users"
    }else{
      this.isPickUsersAble=true;
      this.disabled.sendMail=true;
      this.disabled.sendNotify=true;
      this.disabled.sendMessage=true;
    }
  }
  //即刻下发事件处理方法
  ckboxToggle(messageType:any){
    if(messageType=='now'){
      this.IsChecked[messageType]=!this.IsChecked[messageType]; //切换对勾状态
      if(this.disabled[messageType]==false){
          this.disabled.now=true;
          this.allowChange=true;
      }else{
        this.disabled.now=false;
        this.allowChange=false;
      }
    }
  }
  //模态框用户事件绑定
  modalChange(message){
    switch ( message.type ) {
      case 'search':
        alert('查询');
        break;
      case 'ok':
        alert('确定');
        this.modalService.hide(1);
        break;
      case 'all':
        alert('全选');
        break;
      default:
        break;
    }
  }
  //模态框分页事件
  modalPageChange(){
    alert('换页数');
  }
  //返回
  handleBackBtnClick() {
    this.location.back()
  }
  //保存
  handleSaveBtnClick(){
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    if ( this._editType === 'edit' ) {
      this.message.sendMail=this.Cint(this.message.sendMail);
      this.message.sendNotify=this.Cint(this.message.sendNotify);
      this.message.sendMessage=this.Cint(this.message.sendMessage);
      this.service.putOne(this.message).then((data:any) => {
        if(data.code=="0") {
          this.alertSuccess(data.message);
        }else{
          this.alertError(data.message);
        }
      }).catch(err => {
        this.alertError(err.json().message);
      });
    } else if ( this._editType === 'add' ) {
      this.message.sendMail=this.Cint(this.message.sendMail);
      this.message.sendNotify=this.Cint(this.message.sendNotify);
      this.message.sendMessage=this.Cint(this.message.sendMessage);
      //console.log(this.message);
      this.service.postOne(this.message).then((data:any) => {
        if(data.code=='0') {
          this.alertSuccess(data.message);
        }else{
          this.alertError(data.message);
        }
      }).catch(err => {
        this.alertError(err.message);
      });

    } else {
      return;
    }

  }
  //将true false转成1 0
  Cint(parm:Boolean){
    return parm === true ? 1 : 0;
  }
  //模态框
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.service.getUsers(this.usersType).then(res => {
      this.modalUsers = res.data.list;
    });
  }
  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/message/message/'])
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
}
