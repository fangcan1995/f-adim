import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
} from "@angular/core";
// UserManageService
import { MessageService } from "../../message.service";
import { BaseModalComponent } from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { User } from "../../../../model/auth/user";
import { GlobalState } from "../../../../../global.state";
import { ModalComponent } from "../../../../../theme/components/ng2-bs4-modal/modal";
import { jsonTree } from "../../../../../theme/utils/json-tree";
import { MessageAddedDialogComponent } from '../message-added-dialog/message-added-dialog.component';
import * as _ from 'lodash'
/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'message-edit-dialog',
  styleUrls: ['./message-edit-dialog.component.css'],
  templateUrl: './message-edit-dialog.component.html',
})
export class  MessageEditDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  SAVEEVENT = 'saveSysUser';
  EDITEVENT = 'editSysUser';
  title: "消息模板列表";
  sysUser : User = new User();
  datas = [];
  roles = [];
  record =[];
  buttonFlag = true;
  flag: string;

  staffs = [];
  staffName;
 titles = [
    {key:'tplName', label:'模板名称'},,
    {key:'tplType', label:'业务类型'},
    {key:'tplContent', label:'模板内容'},
  ];
  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: MessageService, private _state: GlobalState) {
    super();
    this.service.getRoles().then((data) => {
      this.roles = data.data;
      if (this.flag == "1") {
        for (let role of this.roles) {
          for (var i = 0; i < this.sysUser.roles.length; i++) {
            if (role.roleId == this.sysUser.roles[i]) {
              role.selected = true;
            }
          }
        }
      }
    });
  }
  hasGlobalFilter = true;
  filters = [
    {
      key: 'name',
      label: '接收账号',
      type: 'input.text',
    },
    {
      key: 'real_name',
      label: '接收号码',
      type: 'input.text',
    },
    {
      key: 'gender',
      label: '消息类型',
      type: 'select',
      options: [
        {
          content: '请选择'
        },
        {
          value: '0',
          content: '短信'
        },
        {
          value: '1',
          content: '电话',
        }
      ]
    },
    {
      key: 'mobile',
      label: '发送状态',
      type: 'select',
       options: [
        {
          content: '请选择'
        },
        {
          value: '0',
          content: '已发'
        },
        {
          value: '1',
          content: '未发',
        }
      ]
    },
  ]
  actionSet = {
    'update': {
      'type': 'update',
      'name': '修改',
      // 'icon': 'ion-close-round',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '启用',
      'className': 'btn btn-xs btn-info',
      // 'icon': 'ion-close-round',
      // 'action': 'remove'
    },
  }
  ngOnInit(){

    // this.service.getStaffsWithOrgs().then(result=>{
    //   if (result.success){
    //     result.data.map(res=>{
    //       if (res.customNodeType=='org'){
    //         res['customIcon'] = 'fa fa-sitemap';
    //       }
    //       if (res.customNodeType=='staff'){
    //         res['customIcon'] = 'ion-person';
    //       }
    //     });
    //     this.staffs = jsonTree(result.data);
    //   }else {
    //     alert(result.message);
    //   }
    // })

    // this.title = this.data.title;
    // this.flag = this.data.flag;
    // if (this.flag == '1') {
    //   this.sysUser = this.data.user;
    //   this.staffName = this.data.user.staffName;
    //   this.buttonFlag = false;
    // }
  }
   getDatas(params?):void{
      this.service.getAddData()
      .then(res => {
        this.datas = res.data;
        this.record = _.map(this.datas, t => {
        let actions;
        actions = [this.actionSet.update, this.actionSet.delete]
        return _.set(t, 'actions', actions)
      })
    });
  }
  // onSave(): void {
  //   let rolesTemp: string[] = [];
  //   for (let data of this.roles) {
  //     if (data.selected) {
  //       rolesTemp.push(data.roleId);
  //     }
  //   }
  //   this.sysUser.roles = rolesTemp;
  //   this.service.createUser(this.sysUser).then((param) => {
  //     this.closeModal();
  //     this._state.notify(this.SAVEEVENT, param); //触发新增发放
  //   });
  // }

  // onEdit(): void {
  //   let rolesTemp: string[] = [];
  //   for (let data of this.roles) {
  //     if (data.selected) {
  //       rolesTemp.push(data.roleId);
  //     }
  //   }
  //   this.sysUser.roles = rolesTemp;
  //   this.service.updateUser(this.sysUser).then((param) => {
  //     this.closeModal();
  //     this._state.notify(this.EDITEVENT, param);
  //   });
  // }

  /**
   * 树选择事件
   */
  // onTreePickerNotify($event){
  //   if($event.eventName == "onSelectCompleted"){
  //     if($event.data.length > 0) {
  //       this.sysUser.staffId = $event.data[0].id;
  //       this.staffName = $event.data[0].data.name;
  //     }else {
  //       this.sysUser.staffId = undefined;
  //       this.staffName = undefined;
  //     }
  //   }
  // }

}
