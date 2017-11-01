import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common"; 
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { UserService } from './user.service';
import { SeerDialogService, SeerMessageService } from '../../../theme/services';
import { UPDATE, DELETE, CREATE } from '../../common/seer-table';
@Component({
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
  providers: [DatePipe],
})
export class UserComponent implements OnInit {
  constructor(
    private _router:Router,
    private _userService:UserService,
    private _dialogService:SeerDialogService,
    private _messageService:SeerMessageService,
    private _datePipe:DatePipe
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
      key: 'userId',
      label: '用户账号',
    },
    {
      key: 'loginName',
      label: '用户名称',
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
    },
    {
      key: 'loginIp',
      label: '最后登录IP',
    },
    {
      key: 'loginIp',
      label: '最后登录IP',
    },
    {
      key: 'loginDate',
      label: '最后登录时间',
      type: 'date-time',
    },
    {
      key: 'createUser',
      label: '创建人',
    },
    {
      key: 'createTime',
      label: '创建时间',
      type: 'date-time',
      hidden: true,
    },
    {
      key: 'updateUser',
      label: '更新人',
    },
    {
      key: 'updateTime',
      label: '更新时间',
      type: 'date-time',
      hidden: true,
    },
    {
      key: 'roleName',
      label: '用户角色',
    }
  ];
  total = 0;
  users = [];
  pageSize: 10;
  pageNum: 1;
  sortBy: '';
  params:any = { };
  ngOnInit() {
    this.params = {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      sortBy: this.sortBy
    }
  }
  getList():void {
    this._userService.getList(this.params)
    .then(res => {
      let data = res.data || {};
      this.users = _.map(data.list, t => _.set(t, 'actions', [UPDATE, DELETE]))
      this.total = data.total || 0;

      this.pageSize = data.pageSize || this.params.pageSize;
      this.pageNum = data.pageNum || this.params.pageNum;
    })
    .catch(err => {
      this.showError( err.msg || '获取用户失败' );
    })
  }
  handleFiltersChanged(params) {
    let { loginDate, updateTime, ...otherParams } = params;
    let loginDateStart,
        loginDateEnd,
        updateTimeStart,
        updateTimeEnd;
    if ( _.isArray(loginDate) ) {
      loginDateStart = loginDate[0] ? this._datePipe.transform(loginDate[0],"yyyy-MM-dd HH:mm:ss") : null;
      loginDateEnd = loginDate[1] ? this._datePipe.transform(new Date(loginDate[1].getTime() + 86400000),"yyyy-MM-dd HH:mm:ss") : null;
    }
    if ( _.isArray(updateTime) ) {
      updateTimeStart = updateTime[0] ? this._datePipe.transform(updateTime[0],"yyyy-MM-dd HH:mm:ss") : null;
      updateTimeEnd = updateTime[1] ? this._datePipe.transform(new Date(updateTime[1].getTime() + 86400000),"yyyy-MM-dd HH:mm:ss") : null;
    }
    this.params = {
      ...this.params,
      ...otherParams,
      loginDateStart,
      loginDateEnd,
      updateTimeStart,
      updateTimeEnd,
    }
    this.getList();
  }
  
  handleChangePage($event) {
    this.params.pageNum = $event.pageNum;
    this.params.pageSize = $event.pageSize;
    this.getList();
  }

  /*更新*/
  handleNotify(message): void {
    const { type, data } = message;
    switch ( type ) {
      case CREATE.type:
        this._router.navigate(['/system/user/add']);
        break;
      case UPDATE.type:
        this._router.navigate(['/system/user/edit', data.userId]);
        break;
      case DELETE.type:
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this._userService
              .deleteOne(message.data.userId)
              .then((res) => {
                this.showSuccess(res.msg || '删除用户成功')
                this.getList();
              })
              .catch(err => {
                this.showError(err.msg || '删除用户失败')
              });
            }
          })
        break;
    }
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