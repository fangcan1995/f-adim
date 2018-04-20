import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { UserService } from './plan.service';
import {
    ManageService,
    SeerDialogService,
    SeerMessageService,
    AuthService,
} from '../../../theme/services';
import { GlobalState } from '../../../global.state';
import { UPDATE, DELETE, CREATE, ENABLE, DISABLE } from '../../common/seer-table';
import { CouponService } from "../../operation/coupon/coupon.service";
@Component({
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
    providers: [DatePipe],
})
export class UserComponent implements OnInit {
    constructor(
        private _router: Router,
        private _userService: UserService,
        private _dialogService: SeerDialogService,
        private _messageService: SeerMessageService,
        private _datePipe: DatePipe,
        private _manageService: ManageService,
        private _state: GlobalState,
        private _authService: AuthService
    ) { }
    hasGlobalFilter: boolean = true;
    filters: any = [
        {
            key: 'loginName',
            label: '用户账户',
            type: 'input.text'
        },
        {
            key: 'empName',
            label: '用户姓名',
            type: 'input.text'
        },
        {
            key: 'phone',
            label: '联系电话',
            type: 'input.text'
        },
        {
            key: 'departmentName',
            label: '所属机构',
            type: 'input.text'
        },
        {
            key: 'roleName',
            label: '用户角色',
            type: 'input.text'
        },
        {
            key: 'loginStatus',
            label: '账号状态',
            type: 'select',
            isDict: true,
            category: 'USER_STATUS_2',
        },
        {
            key: 'createTime',
            label: '创建时间',
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
            key: 'empName',
            label: '用户名称',
        },
        {
            key: 'phone',
            label: '联系电话',
        },
        {
            key: 'departmentName',
            label: '所属机构',
            textAlign: 'left'
        },
        {
            key: 'loginStatus',
            label: '账号状态',
            isDict: true,
            category: 'USER_STATUS_2',
            textAlign: 'center'
        },
        {
            key: 'createTime',
            label: '创建时间',
            type: 'date-time',
            textAlign: 'center'
        },
        {
            key: 'updateTime',
            label: '更新时间',
            type: 'date-time',
            textAlign: 'center'
        },
        {
            key: 'updateUser',
            label: '更新用户',
        },
        {
            key: 'roleName',
            label: '用户角色',
            hidden: true
        },
        {
            key: 'loginIp',
            label: '最后登录IP',
            hidden: true
        },
        {
            key: 'loginDate',
            label: '最后登录时间',
            type: 'date-time',
            hidden: true,
            textAlign: 'center'
        },
    ];

    
    total = 0;
    users = [];
    pageSize: 10;
    pageNum: 1;
    sortBy: '';
    params: any = {
        pageSize: 10,
        pageNum: 1,
        sortBy: '',
    };

    pageInfo: any = {
        pageSize: 10,
        pageNum: 1,
        sortBy: '',
        GlobalSearch: '',
        excelmaps: {
            loginName: '用户账号',
            empName: '用户名称',
            phone: '联系电话',
            departmentName: '所属机构',
            loginStatus: '账号状态',
            createTime: '创建时间',
            updateTime: '更新时间',
            updateUser: 'updateUser',
        }
    }

    ngOnInit() {
        this.getList(this.pageInfo);
    }
    getList(params): void {
        this._userService.getList(params)
            .then(res => {
                let data = res.data || {};
                this.users = data.list;
                this.users = _.map(this.users, t => {
                    let status = t.loginStatus;
                    let actions;
                    switch (status) {
                        case '0':
                            actions = [UPDATE, DISABLE];
                            break;
                        case '1':
                            actions = [UPDATE, ENABLE];
                            break;
                    }
                    return _.set(t, 'actions', actions);
                });
                this.total = data.total || 0;

                this.pageSize = data.pageSize || this.params.pageSize;
                this.pageNum = data.pageNum || this.params.pageNum;
            })
            .catch(err => {
                console.log(err);
                this.showError(err.msg || '获取用户失败');
            })
    }
    handleFiltersChanged(params) {
        console.log(params);
        let { loginDate, createTime, ...otherParams } = params;
        let loginDateStart,
            loginDateEnd,
            createTimeStart,
            createTimeEnd;
        if (_.isArray(loginDate)) {
            loginDateStart = loginDate[0] ? this._datePipe.transform(loginDate[0], "yyyy-MM-dd HH:mm:ss") : undefined;
            loginDateEnd = loginDate[1] ? this._datePipe.transform(new Date(loginDate[1].getTime() + 86400000), "yyyy-MM-dd HH:mm:ss") : undefined;
        }
        if (_.isArray(createTime)) {
            createTimeStart = createTime[0] ? this._datePipe.transform(createTime[0], "yyyy-MM-dd HH:mm:ss") : undefined;
            createTimeEnd = createTime[1] ? this._datePipe.transform(new Date(createTime[1].getTime() + 86400000), "yyyy-MM-dd HH:mm:ss") : undefined;
        }
        this.pageInfo = {
            ...this.pageInfo,
            ...otherParams,
            loginDateStart,
            loginDateEnd,
            createTimeStart,
            createTimeEnd,
        }
        this.getList(this.pageInfo);
    }

    handleChangePage({ pageNum, pageSize }) {
        this.pageInfo.pageNum = pageNum;
        this.pageInfo.pageSize = pageSize;
        this.getList(this.pageInfo);
    }

    handleNotify({ type, data, column }): void {
        switch (type) {
            case 'hideColumn':
                this.pageInfo.excelmaps = column;
                break;
            case CREATE.type:
                this._router.navigate(['/system/user/add']);
                break;
            case UPDATE.type:
                this._router.navigate(['/system/user/edit', data.userId]);
                break;
            case 'export': 
                this._userService.exportForm(this.pageInfo)
                    .then(res => {
                        let blob = res.blob();
                        let a = document.createElement('a');
                        let url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = '用户管理' + '.xls';
                        a.click();
                        window.URL.revokeObjectURL(url);
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                break;
            case DISABLE.type:
                this._dialogService.confirm('确定停用该用户吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._userService
                                .deleteOne(data.userId)
                                .then((res) => {
                                    this.showSuccess(res.msg || '停用用户成功');
                                    // 如果删除的用户正好是自己，那么退出到登录页
                                    let userInLocal = this._manageService.getUserFromLocal() || {};
                                    if (userInLocal.userId == data.userId) {
                                        this._authService.logout().subscribe(res => {
                                            this._router.navigate(['/login'])
                                        })
                                    } else {
                                        this.getList(this.pageInfo);
                                    }

                                })
                                .catch(err => {
                                    this.showError(err.msg || '停用用户失败')
                                });
                        }
                    })
                break;
            case ENABLE.type:
                this._dialogService.confirm('确定启用该用户吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._userService
                                .deleteOne(data.userId)
                                .then((res) => {
                                    this.showSuccess(res.msg || '启用用户成功');
                                    // 如果删除的用户正好是自己，那么退出到登录页
                                    let userInLocal = this._manageService.getUserFromLocal() || {};
                                    if (userInLocal.userId == data.userId) {
                                        this._authService.logout().subscribe(res => {
                                            this._router.navigate(['/login'])
                                        })
                                    } else {
                                        this.getList(this.pageInfo);
                                    }

                                })
                                .catch(err => {
                                    this.showError(err.msg || '启用用户失败')
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

