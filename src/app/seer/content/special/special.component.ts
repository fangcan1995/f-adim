import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpecialService } from "./special.service";
import { SeerDialogService } from "../../../theme/services/seer-dialog.service";
import { SeerMessageService } from "../../../theme/services/seer-message.service";
import { UPDATE, DELETE, ENABLE, DISABLE } from "../../common/seer-table/seer-table.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
import * as _ from 'lodash';
import {
    FROUNT_URL
} from "../../../theme/services";

@Component({
    templateUrl: './special.component.html',
    styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit, OnDestroy {

    hasGlobalFilter = true;
    isLoading = true;
    filterRowLength = 3;
    filters = [
        { key: 'subjectName', label: '专题标题', type: 'input.text' },
        {
            key: 'subjectType',
            label: '专题类型',
            isDict: true,
            type: 'select',
            category: 'SUBJECT_TYPE',
        },
        {
            key: 'device',
            label: '设备',
            isDict: true,
            type: 'select',
            category: 'ADVERTISING_PUTENV',
        },
        {
            key: 'delFlag',
            label: '专题状态',
            isDict: true,
            type: 'select',
            category: 'DICT_DEL_FLAG',
        },
    ];

    specials = [];
    titles = [
        { key: 'subjectName', label: '专题标题' },
        { key: 'url', label: '专题路径',type:'link' },
        { key: 'updateTime', label: '修改时间' },
        { key: 'updateUser', label: '最后修改人' },
        {
            key: 'subjectType',
            label: '专题类型',
            isDict: true,
            category: 'SUBJECT_TYPE'
        },
        {
            key: 'device',
            label: '设备',
            isDict: true,
            category: 'SUBJECT_PUTENV'
        },
        {
            key: 'delFlag',
            label: '专题状态',
            isDict: true,
            category: 'DICT_DEL_FLAG'
        },
    ];


    pageInfo = {
        "pageNum": 1,
        "pageSize": 10,
        "globalSearch": '',
        "sortBy": "",
        "subjectName": '',
        "subjectType": '',
        "device": '',
        "delFlag": '',
        "total": ''
    };

    map = {

    }

    constructor(private services: SpecialService, private _dialogService: SeerDialogService,
                private _messageService: SeerMessageService,
                private _router: Router, private _activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.getList(this.pageInfo);
    }


    getList(params?) {
        this.services.getList(params)
            .then(res => {
                this.pageInfo.pageNum = res.data.pageNum;
                this.pageInfo.pageSize = res.data.pageSize;
                this.pageInfo.total = res.data.total;
                this.specials = res.data.list;
                console.log(this.specials);
                this.specials = _.map(this.specials, t => {
                    let status = t.delFlag;
                    t.url=`${FROUNT_URL}${t.device}/${t.id}`   //前台路径/subject_common/6
                    let actions;
                    switch (status) {
                        case 0:
                            actions = [UPDATE, DISABLE];
                            break;
                        case 1:
                            actions = [UPDATE, ENABLE];
                            break;
                    }
                    return _.set(t, 'actions', actions);
                })
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
    }

    onChange(message) {
        console.log(message);
        const type = message.type;
        let data = message.data;
        let column = message.column;

        switch (type) {
            case 'create':
                this._router.navigate(['add'], { relativeTo: this._activatedRoute });
                break;
            case 'update':
                this._router.navigate([`edit/${message.data.id}`], { relativeTo: this._activatedRoute });
                break;

                case DISABLE.type:
                this._dialogService.confirm('确定停用该专题吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this.services
                                .deleteOne(data.id)
                                .then((res) => {
                                    this.alertSuccess(res.msg || '停用专题成功');
                                    this.getList(this.pageInfo);


                                })
                                .catch(err => {
                                    this.alertError(err.msg || '停用专题失败')
                                });
                        }
                    })
                break;
            case ENABLE.type:
                this._dialogService.confirm('确定启用该专题吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this.services
                                .deleteOne(data.id)
                                .then((res) => {
                                    this.alertSuccess(res.msg || '启用专题成功');
                                    this.getList(this.pageInfo);
                                })
                                .catch(err => {
                                    this.alertError(err.msg || '启用专题失败')
                                });
                        }
                    })
                break;
        }
    }

    handleFiltersChanged($event) {
        console.log($event);
        this.pageInfo.globalSearch = $event.globalSearch;
        this.pageInfo.subjectName = $event.subjectName;
        this.pageInfo.subjectType = $event.subjectType;
        this.pageInfo.device = $event.device;
        this.pageInfo.delFlag = $event.delFlag;
        this.getList(this.pageInfo);
    }


    /* 切换页面 */
    handleChangePage($event) {
        this.pageInfo.pageSize = $event.pageSize;
        this.pageInfo.pageNum = $event.pageNum;
        this.getList(this.pageInfo);
    }

    ngOnDestroy(): void {
        // throw new Error("Method not implemented.");
    }

    alertSuccess(info: string) {
        return this._messageService.open({
            icon: 'fa fa-check',
            message: info,
            autoHideDuration: 3000,
        })
    };
    alertError(errMsg: string) {
        // 错误处理的正确打开方式
        this._messageService.open({
            icon: 'fa fa-times-circle',
            message: errMsg,
            autoHideDuration: 3000,
        })
    };

}
