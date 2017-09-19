import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { UserManageService } from "../../user-manage.service";
import { Router } from "@angular/router";
import { GlobalState } from "../../../../../global.state";
import { UserAddedDialogComponent } from "../user-added-dialog/user-added-dialog.component";
import {
  DynamicComponentLoader,
  DynamicComponentParam,
} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import * as _ from 'lodash'

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  providers: [UserManageService],
  styleUrls: ['./user-list.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [UserAddedDialogComponent]
})
export class UserListComponent implements OnDestroy {
  title = '用户列表';
  EVENT = 'openUserAddedDialog';
  SAVEEVENT = 'saveSysUser';
  EDITEVENT = 'editSysUser';
  source = [];
  roles = [];
  record = [];
  hasGlobalFilter = true;
  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;
  filters = [
    {
      key: 'name',
      label: '更新人',
      type: 'select',
      options: [
        {
          content: '正常'
        },
        {
          value: '0',
          content: '病假'
        },
        {
          value: '1',
          content: '事假',
        },
        {
          value: '2',
          content: '产假',
        },
        {
          value: '3',
          content: '婚假',
        },
        {
          value: '4',
          content: '出差',
        }
      ]
    },
    {
      key: 'validState',
      label: '状态',
      type: 'select',
      isDict: true,
    },
    {
      key: 'stage',
      label: '员工状态',
      type: 'select',
       options: [
        {
          content: '正常'
        },
        {
          value: '0',
          content: '病假'
        },
        {
          value: '1',
          content: '事假',
        },
        {
          value: '2',
          content: '产假',
        },
        {
          value: '3',
          content: '婚假',
        },
        {
          value: '4',
          content: '出差',
        }
      ]
    },
    {
      key: 'begigTime',
      label: '开始时间',
      type: 'input.data',
    },




    // {
    //   key: 'gender',
    //   label: '消息类型',
    //   type: 'select',
    //   options: [
    //     {
    //       content: '请选择'
    //     },
    //     {
    //       value: '0',
    //       content: '短信'
    //     },
    //     {
    //       value: '1',
    //       content: '电话',
    //     }
    //   ]
    // },
    // {
    //   key: 'mobile',
    //   label: '发送状态',
    //   type: 'select',
    //    options: [
    //     {
    //       content: '请选择'
    //     },
    //     {
    //       value: '0',
    //       content: '已发'
    //     },
    //     {
    //       value: '1',
    //       content: '未发',
    //     }
    //   ]
    // },
  ]
  titles = [
    {
      key:'account',
      label:'用户账号',
    },
    {
      key:'userName',
      label:'用户名称',
    },
    {
      key:'organ',
      label:'所属机构',
    },
    {
      key:'count',
      label:'账号状态',
    },
    {
      key:'userId',
      label:'最后登录IP',
    },
    {
      key:'createTime',
      label:'最后登录时间',
    },
    {
      key:'operator',
      label:'创建人',
    },
    {
      key:'createTime',
      label:'创建时间',
    },
    {
      key:'operator',
      label:'更新人',
    },
    {
      key:'createTime',
      label:'跟新时间',
    },
    {
      key:'roles',
      label:'用户角色',
    },
  ];
  actionSet = {
    'update': {
      'type': 'update',
      'name': '修改',
      // 'icon': 'ion-close-round',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
      // 'action': 'remove'
    },
  }

  // titleOption =[
  //   {
  //     key:'account',
  //     label:'用户账号',
  //   },
  //   {
  //     key:'userName',
  //     label:'用户名称',
  //   },
  //   {
  //     key:'roles',
  //     label:'用户角色',
  //   },
  //   {
  //     key:'staffId',
  //     label:'所属员工',
  //   },
  //   {
  //     key:'accountState',
  //     label:'账号状态',
  //   },
  //   {
  //     key:'loginIp',
  //     label:'最后登录IP',
  //   },
  //   {
  //     key:'loginTime',
  //     label:'最后登录时间',
  //   },
  //   {
  //     key:'createUser',
  //     label:'创建人',
  //   },
  //   {
  //     key:'createTime',
  //     label:'创建时间',
  //   },
  //   {
  //     key:'operator',
  //     label:'更新人',
  //   },
  //   {
  //     key:'operateTime',
  //     label:'更新时间',
  //   }
  // ];

  constructor(protected service: UserManageService, private router: Router, private _state: GlobalState) {
    /*弹出新增、修改页面订阅事件*/
    this._state.subscribe(this.EVENT, (param) => {
      this.openModal(param);
    });
    /*新增方法订阅事件*/
    this._state.subscribe(this.SAVEEVENT, (param) => {
      if (param.success) {
        this.allUsersList();
      }
    });
    /*修改方法订阅事件*/
    this._state.subscribe(this.EDITEVENT, (param) => {
      if (param.success) {
        this.allUsersList();
      }
    });
    this.allUsersList();
  }

  public openModal(data) {
    console.log(data);
    console.log("---------------------------------------------------");
    
    this.dynamicComponentLoader.loadComponent(data.component,data.data);
  }

  ngOnDestroy(): any {
    this._state.unsubscribe(this.EVENT);
  }

  /*刷新用户信息列表*/
  allUsersList() {
    this.service.getUsers().then((data) => {
      this.source = data.data;
      console.log( this.source );
      
       this.record = _.map(this.source, t => {
        let actions;
        actions = [this.actionSet.update, this.actionSet.delete]
        return _.set(t, 'actions', actions)
      })



    });
  }

  /*弹出新增用户模态窗口*/
  popupAdd(): void {
    let param: DynamicComponentParam = {component: UserAddedDialogComponent, data: {title:'新增用户', flag: '0'} };
    this._state.notify(this.EVENT, param);
  }

  /*弹出修改用户模态窗口*/
  popupEdit(event):void {
    let param: DynamicComponentParam = {component: UserAddedDialogComponent, data: {user: event, title:'修改用户', flag: '1'} };
    this._state.notify(this.EVENT, param);
  }

  onDelete(event):void {
    this.service.deleteUser(event.data.id).then(()=>true).catch(()=>false);
  }

  onChange(message):void {
    console.log(message);
    console.log("11111");
    
    if(message.type == 'add'){ //新增
      this.popupAdd();
    }
    if(message.type == 'update'){ //修改
      this.popupEdit(message.data);
    }
    if(message.type == 'delete'){ //删除
      this.service.deleteUser(message.data.userId).then((param) => {
        if (param.success) {
          this.allUsersList();
        }
      })
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.userId);
      });
      this.service.batchDeleteUser(ids).then((param) => {
        if (param.success) {
          this.allUsersList();
        }
      })
    }
  }

}
