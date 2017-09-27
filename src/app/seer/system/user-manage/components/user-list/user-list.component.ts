import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { UserManageService } from "../../user-manage.service";
import { Router } from "@angular/router";
import { GlobalState } from "../../../../../global.state";
// import { UserAddedDialogComponent } from "../user-added-dialog/user-added-dialog.component";
import {
  DynamicComponentLoader,
  DynamicComponentParam,
} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { SeerDialogService } from '../../../.../../../../theme/services/seer-dialog.service'
import {UPDATE, DELETE} from "../../../../common/seer-table/seer-table.actions"
import * as _ from 'lodash'


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  providers: [UserManageService],
  styleUrls: ['./user-list.scss'],
  encapsulation: ViewEncapsulation.None,
  // entryComponents: [UserAddedDialogComponent]
})
export class UserListComponent implements OnDestroy {
  userList = ""
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
      label: '最后登录时间',
      type: 'input.data',
    },
    {
      key: 'endTime',
      label: '跟新时间',
      type: 'input.data',
    },
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

  constructor(protected service: UserManageService, private router: Router, private _state: GlobalState, private _dialogService: SeerDialogService) {
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
      console.log( this.source);
      this.source = _.map(this.source, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  }

  /*弹出新增用户模态窗口*/
  // popupAdd(): void {
  //   let param: DynamicComponentParam = {component: UserAddedDialogComponent, data: {title:'新增用户', flag: '0'} };
  //   this._state.notify(this.EVENT, param);
  // }

  /*弹出修改用户模态窗口*/
  // popupEdit(event):void {
  //   let param: DynamicComponentParam = {component: UserAddedDialogComponent, data: {user: event, title:'修改用户', flag: '1'} };
  //   this._state.notify(this.EVENT, param);
  // }

  onDelete(event):void {
    this.service.deleteUser(event.data.id).then(()=>true).catch(()=>false);
  }
  onChange(message):void {
    const type = message.type;
    console.log(type);
    
    let data = message.data;

    switch ( type ) {
      case 'create':
        //  this.popupAdd();
         this.router.navigate(['/system/user-manage/add/']);
        break;
      case 'update': 
        // this.popupEdit(message.data);
      this.router.navigate(['/system/user-manage/edit',message.data.userId]);
       
        break;
      case 'delete':
      console.log("1111111");
      
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              // this.service.deleteOne(message.data.id)
              //   .subscribe(data => {
              //     this.getList();
              // });
            }
          })
        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }
}
