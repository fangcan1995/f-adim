import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { PlanService } from './plan.service';
import {
    ManageService,
    SeerDialogService,
    SeerMessageService,
    AuthService,
} from '../../../theme/services';
import { GlobalState } from '../../../global.state';
import { UPDATE, DELETE, CREATE, ENABLE, DISABLE } from '../../common/seer-table';
import { CouponService } from "../../operation/coupon/coupon.service";
import { Console } from "@angular/core/src/console";
@Component({
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss'],
    providers: [DatePipe],
})
export class UserComponent implements OnInit {
    constructor(
        private _router: Router,
        private _planService: PlanService,
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
            key: 'SEQ',
            label: '序号',
            textAlign: 'center'
        },
        {
            key: 'schedName',
            label: '计划名称',
        },
        {
            key: 'jobName',
            label: '任务名称',
        },
        {
            key: 'jobGroup',
            label: '任务分组',
        },
       
        {
            key: 'cornExpression',
            label: 'cron表达式',
        },
        {
            key: 'triggerState',
            label: '任务状态',
            isDict: true,
            category: 'USER_STATUS_2',
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
        // sortBy: '',
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
        this.getList(this.params);
    }
    getList(params): void {
        this._planService.getList(params)
            .then(res => {
                let data = res.data || {};
                this.users = data.list;
                this.users = _.map(this.users, t => {
                    let status = t.triggerState;
                    let actions;
                    switch (status) {
                        case 'FINISHED':
                            actions = [];
                            break;
                        case 'PAUSED':
                            actions = [UPDATE, DELETE, ENABLE];
                            break;
                        default:
                            actions = [UPDATE, DELETE, DISABLE];
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
                this.showError(err.msg || '获取任务失败');
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
        const params={
            jobName:data.jobName,
            jobGroup:data.jobGroup
        }
        
        switch (type) {
            case 'hideColumn':
                this.pageInfo.excelmaps = column;
                break;
            case CREATE.type:
                this._router.navigate(['/system/plan/add']);
                break;
            case UPDATE.type:
                const param=JSON.stringify(params)
                this._router.navigate([`/system/plan/edit/${param}`]);
                break;
            case 'export': 
                this._planService.exportForm(this.pageInfo)
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
            console.log(data);
            
                this._dialogService.confirm('确定暂停该任务吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._planService
                                .putOne(params)
                                .then((res) => {
                                    this.showSuccess(res.msg || '暂停任务成功');
                                    this.getList(this.params);
                                })
                                .catch(err => {
                                    this.showError(err.msg || '暂停任务失败')
                                });
                        }
                    })
                break;
            case ENABLE.type:
                this._dialogService.confirm('确定恢复该任务吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._planService
                                .resumeOne(params)
                                .then((res) => {
                                    this.showSuccess(res.msg || '恢复任务成功');
                                    this.getList(this.pageInfo);
                                })
                                .catch(err => {
                                    this.showError(err.msg || '恢复任务失败')
                                });
                        }
                    })
                break;
            case DELETE.type:
                this._dialogService.confirm('确定删除该任务吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._planService
                                .deleteOne(params)
                                .then((res) => {
                                    this.showSuccess(res.msg || '删除任务成功');
                                    this.getList(this.pageInfo);
                                })
                                .catch(err => {
                                    this.showError(err.msg || '删除任务失败')
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

