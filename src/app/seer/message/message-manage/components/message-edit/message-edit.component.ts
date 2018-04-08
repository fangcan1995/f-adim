import {Component,OnInit,TemplateRef, ViewEncapsulation,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params,Router} from "@angular/router";
import { MessageService } from "../../message.service";
import { GlobalState } from "../../../../../global.state";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService} from 'ngx-bootstrap/modal';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import * as _ from 'lodash';
import {formatDate} from "ngx-bootstrap/bs-moment/format";

@Component({
  selector: 'message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class MessageEditComponent {
  message:any = {};
  expectSendTime;
  title : string;
  isAdd: boolean;
  editId: string;
  isPickUsersAble:boolean=true;  //选择用户按钮无效
  //receivers=``;//接收用户
  usersType: string; //用户类型
  //IsChecked={"sendMail":false,"sendNotify":false,"sendMessage":false,"now":false};//checkbox初始状态
  disabled={"sendMail":true,"sendNotify":true,"sendMessage":true,"now":true}; //checkbox是否可用
  allowChange:boolean=false;//date-picker是否可用
  readonly:boolean=false;//date-picker是否只读
  _editType: string = 'add';
  forbidSaveBtn: boolean = true;
  //模态框相关
  modalClass={"class":"modal-lg"};
  modalUsers=[];
  modalActionSet = {
    'SEARCH': {
      'type': 'search',
      'name': '查询',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'CANCEL': {
      'type': 'cancel',
      'name': '取消',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-remove'
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
  //modalhasGlobalFilter = false;
  modalfilters =[];
  formGroupColNum='col-sm-12 col-md-6 col-lg-6';
  modalTitles=[];
  modalPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "globalSearch":"",
    "memberType":"",
    "department":"",
    "mageMix":"",
    "mageMax":"",
    "sex":"",
    "investOrNot":"",
    "investDateBefore":"",
    "investDateAfter":"",
    "investAllMix":"",
    "investAllMax":"",
    "investOneMix":"",
    "investOneMax":"",
    "inviteMembersMix":"",
    "inviteMembersMax":"",
  }; //分页、排序、检索
  selectedUserId=[]; //选中的用户id
  ids='';//选中的用户id
  chooseResult:string='选择用户';  //选择人员按钮中文提示


  public modalRef: BsModalRef;
  cardActions2 = [this.modalActionSet.All,this.modalActionSet.OK,this.modalActionSet.CANCEL];

  @ViewChild('validationForm') validationForm;

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
      this._editType='edit';
      this.chooseResult='重新选择';
      this.isPickUsersAble=false;
      this.service.getMessageById(this.editId).then((data) => {
        this.message = data.data;
        this.message.expectSendTime = this.message.expectSendTime ? new Date(this.message.expectSendTime.replace(/-/g, "/")) : '';
        this.ids = this.message.receivers;
        if(this.message.adaptationUser=="1"){
          this.usersType="users";
          //后台用户
          this.disabled={"sendMail":true,"sendNotify":true,"sendMessage":true,"now":false}
        }else if(this.message.adaptationUser=="0"){
          //前台用户
          this.usersType="members";
        }
      });
    }else {
      this.isPickUsersAble=true;
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
      this.message.sendMail=0;
      this.message.sendNotify=0;
      this.usersType="users"
    }else{
      this.isPickUsersAble=true;
      this.disabled.sendMail=true;
      this.disabled.sendNotify=true;
      this.disabled.sendMessage=true;
    }

    this.ids='';

    this.chooseResult='选择用户';

  }

  //即刻下发事件处理方法
  sendNow($event){
    if($event.toElement.checked){
      //this.readonly=true;
      this.message.expectSendTime='';
      this.allowChange=true;
    }else{
      //this.readonly=false;
      this.allowChange=false;
    }
  }
  //保存
  handleSaveBtnClick(){
    if ( this.forbidSaveBtn ) return;
    //this.forbidSaveBtn = true;
    if ( this._editType === 'edit' ) {
      /*this.message.sendMail=this.Cint(this.message.sendMail);
      this.message.sendNotify=this.Cint(this.message.sendNotify);
      this.message.sendMessage=this.Cint(this.message.sendMessage);*/
      this.forbidSaveBtn=true;
      this.message.receivers=this.ids;
      console.log(this.message);
      let messageNew=_.cloneDeep(this.message);
      messageNew.expectSendTime=formatDate(messageNew.expectSendTime,'YYYY-MM-DD hh:mm:ss');

      console.log(messageNew);

      this.service.putOne(messageNew).then((data:any) => {
        this.showSuccess(data.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/message/message/']);
          });
      }).catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '更新失败');
      });
    } else if ( this._editType === 'add' ) {
      this.forbidSaveBtn=true;
      this.message.sendMail=this.Cint(this.message.sendMail);
      this.message.sendNotify=this.Cint(this.message.sendNotify);
      this.message.sendMessage=this.Cint(this.message.sendMessage);
      this.message.receivers=this.ids;
      let messageNew=_.cloneDeep(this.message);
      messageNew.expectSendTime=formatDate(messageNew.expectSendTime,'YYYY-MM-DD hh:mm:ss');

      console.log(messageNew);
      this.service.postOne(messageNew).then((data:any) => {
        this.showSuccess(data.msg || '保存成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/message/message']);
          });
      }).catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '保存失败')
      });
    } else {
      return;
    }

  }

  //将true false转成1 0
  Cint(parm:Boolean){
    return parm === true ? 1 : 0;
  }

  //模态框，前台用户和后台用户显示不一样的内容
  openModal(template: TemplateRef<any>) {
    switch(this.usersType){
      case 'members':
        this.modalfilters=[
          {
            key: 'memberType',
            label: '用户身份',
            type: 'select',
            options:[{value:'', content: '全部'},{value:'1', content: '注册理财师'},{value:'2', content: '财富合伙人'}]
          },
          {
            key: 'department',
            label: '区域',
            type: 'select',
            options:[{value:'', content: '全部'},{value:'1', content: '龙区'},{value:'2', content: '辽区'}]
          },
          {
            key: 'investOrNot',
            label: '投资状态',
            type: 'select',
            options:[{value:'', content: '全部'},{value:'0', content: '未投资'},{value:'1', content: '已投资'}]
          },
          {
            key: 'sex',
            label: '性别',
            type: 'select',
            isDict:true,category:"M_SEX"
          },
          {
            key: 'mage',
            label: '年龄',
            type: 'select',
            options:[{value:'0', content: '全部'},{value:'1', content: '25以下'},{value:'2', content: '25-30'},{value:'3', content: '31-40'},{value:'4', content: '41-50'},{value:'5', content: '50以上'}]
          },
          /*{
            key: 'mage',
            label: '年龄',
            groups: [
              {
                type: 'input.text',
              },
              {
                type: 'input.text',
              },
            ],
            groupSpaces: ['至']
          },*/
          {
            key: 'investDate',
            label: '投资时间',
            groups: [
              {
                type: 'datepicker',
              },
              {
                type: 'datepicker',
              },
            ],
            groupSpaces: ['至']
          },
          {
            key: 'investAll',
            label: '累计投资',
            groups: [
              {
                type: 'input.text',
              },
              {
                type: 'input.text',
              },
            ],
            groupSpaces: ['至']
          },
          {
            key: 'investOne',
            label: '单笔投资',
            groups: [
              {
                type: 'input.text',
              },
              {
                type: 'input.text',
              },
            ],
            groupSpaces: ['至']
          },
          {
            key: 'inviteMembers',
            label: '邀请人数',
            groups: [
              {
                type: 'input.text',
              },
              {
                type: 'input.text',
              },
            ],
            groupSpaces: ['至']
          }
        ];
        this.modalTitles=[
          {key: 'userName', label: '用户名', hidden: false},
          {key: 'trueName', label: '真实姓名', hidden: false},
          {key: 'phoneNumber', label: '手机号', hidden: false},
          {key: 'idNumber', label: '身份证号', hidden: false},
        ];
        break;
      case 'users':

        /*this.modalfilters=[
          {
            key: 'memberType',
            label: '用户身份',
            type: 'select',
            options:[{value:'', content: '全部'},{value:'1', content: '注册理财师'},{value:'2', content: '财富合伙人'}]
          },
          {
            key: 'department',
            label: '区域',
            type: 'select',
            options:[{value:'', content: '全部'},{value:'1', content: '龙区'},{value:'2', content: '辽区'}]
          },
        ];*/
        this.modalTitles= [
          {key: 'emCode', label: '用户名', hidden: false},
          {key: 'empName', label: '真实姓名', hidden: false},
          {key: 'phone', label: '手机号', hidden: false},
          {key: 'idNum', label: '身份证号', hidden: false},
        ];
        break;
      default:
        break;
    }
    this.modalRef = this.modalService.show(template,this.modalClass);
    this.modalfilters=[];
    this.getUsersList();
    //this.selectedUserId=[];   //清空已选择id数组
  }

  //获取列表
  getUsersList():void{
    this.service.getUsers(this.usersType,this.modalPageInfo).then(res => {
      console.log();
      this.modalPageInfo.pageNum=res.data.pageNum;  //当前页
      this.modalPageInfo.pageSize=res.data.pageSize; //每页记录数
      this.modalPageInfo.total=res.data.total; //记录总数
      this.modalUsers = res.data.list;
      let keyId;
      if(this.usersType=='members'){
        keyId='memberId';
      }else if(this.usersType=='users'){
        keyId='id';
      }
      console.log(this.modalUsers);
      this.modalUsers = _.map(this.modalUsers, r =>{
        let idIndex=this.selectedUserId.findIndex(x => x == r[keyId]);
        if(idIndex!=-1){
          return _.set(r, 'selected', 1)
        }else{
          return _.set(r, 'selected', 0)
        }
      }
      );
    });
  }

  //模态框分页事件
  modalPageChange($event){
    this.modalPageInfo.pageSize = $event.pageSize;
    this.modalPageInfo.pageNum=$event.pageNum;
    this.getUsersList();
  }

  //模态框用户事件绑定
  modalChangeCard(message){
    switch ( message.type ) {
      case 'search':
        break;
      case 'ok':
        this.ids='';
        this.ids=this.selectedUserId.join(",");
        //this.chooseResult=`已选定${this.ids.split(',').length}人`;
        this.modalService.hide(1);
        break;
      case 'cancel':
        this.modalService.hide(1);
        break;
      case 'all':
        this.ids='';
        this.service.getIds(this.usersType,this.modalPageInfo).then(data=>{
          if(this.usersType=='members'){
            this.ids=data.message || null;
            console.log('---');
            console.log(this.ids);
          }else if(this.usersType=='users'){

            this.ids=data.data.ids || null;
            console.log('---');
            console.log(this.ids);
          }
          //this.chooseResult=`已选定${this.modalPageInfo.total}人`
        }).catch(err=>{
          this.showError(err.msg || '连接错误');
        });
        this.modalService.hide(1);
        break;
      default:
        break;
    }
  }

  //模态框选择用户id
  modalChangeTable(e){
    const type = e.type;
    let data = e.data;

    let keyId;
    if(this.usersType=='members'){
      keyId='memberId';
    }else if(this.usersType=='users'){
      keyId='id';
    }
    switch (type){
      case 'select_one':
        //选中追加到数组中，否则从数组中删除
        let idIndex=this.selectedUserId.findIndex(x => x == data[keyId]);
        if(data.selected){
          if(idIndex<0){
            this.selectedUserId.push(data[keyId]);
          }
        }else{
          this.selectedUserId.splice(idIndex,1);
        }
        console.log('-----------');
        console.log(this.selectedUserId);
        break;
      case 'select_all':
        //遍历数组，选中追加到数组中，否则从数组中删除
        data.map(r=> {
          let idIndex=this.selectedUserId.findIndex(x => x == r[keyId]);
          if(r.selected){
            //如果选中人员中不存在这个人
            if(idIndex<0){
              this.selectedUserId.push(r[keyId]);
            }
          }else{
            this.selectedUserId.splice(idIndex,1);
          }
        })
        break;
      default:
        break;
    }
  }

  //格式化查询参数
  modalFiltersChanged($event){
    let params=$event;
    let { mage,investDate,investAll,investOne,inviteMembers,...otherParams } = params;
    let mageMix,mageMax,
      investDateBefore, investDateAfter,
      investAllMix,investAllMax,
      investOneMix,investOneMax,
      inviteMembersMix,inviteMembersMax;
    /*if ( _.isArray(mage)) {
      mageMix = mage[0] || null;
      mageMax = mage[1] || null;
    }*/

    switch (mage){
      case `0`:
        mageMix =  null;
        mageMax =  null;
        break;
      case `1`:
        mageMix=0;
        mageMax =  24;
        break;
      case `2`:
        mageMix=25;
        mageMax =  30;
        break;
      case `3`:
        mageMix=31;
        mageMax =  40;
        break;
      case `4`:
        mageMix=0;
        mageMax =  25;
        break;
      case `5`:
        mageMix=41;
        mageMax =  50;
        break;
      case `6`:
        mageMix=50;
        mageMax = 150;
        break;
    }
    if ( _.isArray(investDate)) {
      investDateBefore = investDate[0] ? (formatDate(investDate[0],'YYYY-MM-DD 00:00:00')) : null;
      investDateAfter = investDate[1] ? (formatDate(investDate[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    if ( _.isArray(investAll)) {
      investAllMix = investAll[0] || null;
      investAllMax = investAll[1] || null;
    }
    if ( _.isArray(investOne)) {
      investOneMix = investOne[0] || null;
      investOneMax = investOne[1] || null;
    }
    if ( _.isArray(inviteMembers)) {
      inviteMembersMix = inviteMembers[0] || null;
      inviteMembersMax = inviteMembers[1] || null;
    }
    params = {
      ...otherParams,
      mageMix,
      mageMax,
      investDateBefore,
      investDateAfter,
      investAllMix,
      investAllMax,
      investOneMix,
      investOneMax,
      inviteMembersMix,
      inviteMembersMax,
    }
    this.modalPageInfo = params;
    this.getUsersList();
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
}


