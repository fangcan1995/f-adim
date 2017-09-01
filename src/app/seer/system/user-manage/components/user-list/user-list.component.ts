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

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  titles = [
    {
      key:'account',
      label:'用户账号',
    },
    {
      key:'userName',
      label:'用户名称',
    },
    // {
    //   key:'roles',
    //   label:'用户角色',
    // },
    {
      key:'createTime',
      label:'创建时间',
    }
  ];

  titleOption =[
    {
      key:'account',
      label:'用户账号',
    },
    {
      key:'userName',
      label:'用户名称',
    },
    // {
    //   key:'roles',
    //   label:'用户角色',
    // },
    {
      key:'staffId',
      label:'所属员工',
    },
    {
      key:'accountState',
      label:'账号状态',
    },
    {
      key:'loginIp',
      label:'最后登录IP',
    },
    {
      key:'loginTime',
      label:'最后登录时间',
    },
    {
      key:'createUser',
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
      key:'operateTime',
      label:'更新时间',
    }
  ];

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
    this.dynamicComponentLoader.loadComponent(data.component,data.data);
  }

  ngOnDestroy(): any {
    this._state.unsubscribe(this.EVENT);
  }

  /*刷新用户信息列表*/
  allUsersList() {
    this.service.getUsers().then((data) => {
      this.source = data.data;
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
