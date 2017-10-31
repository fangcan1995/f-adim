import { Component } from "@angular/core";
import * as _ from 'lodash';
import { UserService } from './user.service';
import { SeerDialogService, SeerMessageService } from '../../../theme/services';
@Component({
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
})
export class UserComponent {
  constructor(
    private _userService:UserService,
    private _dialogService:SeerDialogService,
    private _messageService:SeerMessageService,
    ) {}
  hasGlobalFilter:boolean = true;
  filters:any = [
    {
      key: 'updateUser',
      label: '更新人',
      type: 'input.text',
    },
    {
      key: 'loginStatus',
      label: '账号状态',
      type: 'select',
      isDict: true,
      category: 'USER_STATUS',
    },
    {
      key: 'loginDate',
      label: '最后登录时间',
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
      key: 'updateTime',
      label: '更新时间',
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
  ];
  titles = [
    {
      key: 'loginName',
      label: '用户账号',
    },
    {
      key: 'userId',
      label: '用户ID',
    },
    {
      key: 'departmentName',
      label: '所属部门'
    },
    {
      key: 'loginStatus',
      label: '账号状态',
      isDict: true,
      category: 'USER_STATUS',
    }
  ];
  pageSize = 10;
  pageNum = 1;
  total = 0;
  users = [];
  params:any = {};
  handleFiltersChanged(params) {
    let { loginDate, updateTime, ...otherParams } = params;
    let loginDateStart,
        loginDateEnd,
        updateTimeStart,
        updateTimeEnd;
    if ( _.isArray(loginDate) ) {
      loginDateStart = loginDate[0] ? loginDate[0].getTime() : null;
      loginDateEnd = loginDate[1] ? loginDate[1].getTime() : null;
    }
    if ( _.isArray(updateTime) ) {
      updateTimeStart = updateTime[0] ? updateTime[0].getTime() : null;
      updateTimeEnd = updateTime[1] ? updateTime[1].getTime() : null;
    }
    this.params = {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      ...otherParams,
      loginDateStart,
      loginDateEnd,
      updateTimeStart,
      updateTimeEnd,
    }
    this.getList();
  }
  getList():void {
    this._userService.getList(this.params)
    .then(res => {
      let data = res.data || {};
      this.users = data.list || [];
      this.total = data.total || 0;
    })
    .catch(err => {
      this.showError( err.msg || '获取用户失败' );
    })
  }
  handleChangePage($event) {
    this.params.pageNum = $event.pageNum;
    this.params.pageSize = $event.pageSize;
    this.getList();
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
}
