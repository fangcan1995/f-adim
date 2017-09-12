import {
  Component,
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
// import { MessageEditDialogComponent } from "../message-edit-dialog/message-edit-dialog.component";
import * as _ from 'lodash'
/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'message-added-dialog',
  styleUrls: ['./message-added-dialog.component.css'],
  templateUrl: './message-added-dialog.component.html',
})
export class  MessageAddedDialogComponent extends BaseModalComponent implements OnInit{

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
    {key:'name', label:'模板名称'},
    {key:'type', label:'业务类型'},
    {key:'concent', label:'模板内容'},
  ];
  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: MessageService, private _state: GlobalState) {
    super();

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
  this.getDatas();
  }
   getDatas(params?):void{
      this.service.getAddData()
      .then(res => {
        this.datas = res.data;
        console.log(this.datas);
        
      //   this.record = _.map(this.datas, t => {
      //   let actions;
      //   actions = [this.actionSet.update, this.actionSet.delete]
      //   return _.set(t, 'actions', actions)
      // })
    });
  }
}
