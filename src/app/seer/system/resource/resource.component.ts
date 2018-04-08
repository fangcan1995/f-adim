import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ResourceService } from "./resource.service";
import * as _ from 'lodash';
import { CREATE, COPY_CREATE, UPDATE, DELETE, DELETE_MULTIPLE } from "../../common/seer-table/seer-table.actions";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../theme/services/seer-message.service';
import { ManageService } from '../../../theme/services';
import { GlobalState } from '../../../global.state';
@Component({
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit {
    hasGlobalFilter = true;
    titles = [
        {
            key: 'menuId',
            label: '菜单编号'
        },
        {
            key: 'menuPid',
            label: '菜单父编号'
        },
        {
            key: 'menuName',
            label: '菜单名'
        },
        {
            key: 'menuType',
            label: '菜单类型',
            isDict: true,
            category: 'MENU_TYPE'
        },
        {
            key: 'menuDesc',
            label: '菜单说明',
        },
        {
            key: 'sortNum',
            label: '菜单顺序',
        },
        {
            key: 'menuStatus',
            label: '有效状态',
            isDict: true,
            category: 'MENU_STATUS'
        }
    ];

    pageInfo: any = {
        pageNum: 1,
        pageSize: 100000,
        total: 1000,
        globalSearch: '',
        sortBy: '',
        excelmaps: {
            menuId: '菜单编号',
            menuPid: '菜单父编号',
            menuName: '菜单名',
            menuType: '菜单类型',
            menuDesc: '菜单说明',
            sortNum: '菜单顺序',
            menuStatus: '有效状态'
        }
    }
    resources = [];
    tableFilters = {};
    constructor(
        private _resourceService: ResourceService,
        private _dialogService: SeerDialogService,
        private _messageService: SeerMessageService,
        private _manageService: ManageService,
        private _state: GlobalState,
        private _router: Router,
    ) { }
    ngOnInit() {
        this.getList(this.pageInfo);
    }
    getList(params?) {
        this._resourceService.getList(params)
            .then(res => {
                this.resources = _.map(res.data ? res.data.list || [] : [], r => _.set(r, 'actions', [UPDATE, DELETE]));
            })
            .catch(err => {
                this.showError(err.msg || '获取资源失败');
            })
    }

    

    handleNotify(message): void {
        console.log(message);
        const { type, data, column } = message;
        switch (type) {
            case 'hideColumn':
                let newMap = {};
                this.changeColumnMap(column, newMap);
                this.pageInfo.excelmaps = newMap;
                console.log(this.pageInfo);
                break;
            case CREATE.type:
                this._router.navigate(['/system/resource/add']);
                break;
            case UPDATE.type:
                this._router.navigate([`/system/resource/edit/${data.menuId}`]);
                break;
            case DELETE.type:
                this._dialogService.confirm(
                    `确定删除菜单  #${data.menuName}#  吗？`,
                    [
                        {
                            type: 1,
                            text: '确认删除'
                        },
                        {
                            type: 0,
                            text: '暂不删除'
                        },
                    ]
                ).subscribe(action => {
                    if (action === 1) {
                        console.log(data);
                        this._resourceService
                            .deleteOne(data.menuId)
                            .then((res) => {
                                // 如果编辑的菜单正好是用户有权查看的菜单，那么刷新用户信息
                                let resourcesInLocal = this._manageService.getResourcesFromLocal() || [];
                                if (_.find(resourcesInLocal, t => t['menuId']) == data['menuId']) {
                                    this._manageService.refreshLocalDataAndNotify();
                                }
                                this.showSuccess(res.msg || '删除资源成功');
                                this.getList(this.pageInfo);

                            })
                            .catch(err => {
                                this.showError(err.msg || '删除资源失败')
                            });
                    }
                });
                break;
            case DELETE_MULTIPLE.type:
                let ids = _(data).map(t => t.id).value();
                break;
            case 'export':
                console.log(this.pageInfo);
                this._resourceService.exportForm(this.pageInfo).then(res => {
                    let blob = res.blob();
                    let a = document.createElement('a');
                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = '资源管理' + '.xls';
                    a.click();
                    window.URL.revokeObjectURL(url);
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
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
    handleFiltersChanged($event) {
        console.log($event);
        this.pageInfo = {
            ...this.pageInfo,
            globalSearch: $event.globalSearch
        }
        this.getList(this.pageInfo);
    }



    changeColumnMap (columns:Array<string>, newColumnMap:Object) {
        columns.forEach(column => {
            switch(column) {
                case 'menuId':
                    newColumnMap[column] = '菜单编号';
                    break;
                case 'menuPid':
                    newColumnMap[column] = '菜单父编号';
                    break;
                case 'menuName':
                    newColumnMap[column] = '菜单名';
                    break;
                case 'menuType':
                    newColumnMap[column] = '菜单类型';
                    break;
                case 'menuDesc':
                    newColumnMap[column] = '菜单说明';
                    break;
                case 'sortNum':
                    newColumnMap[column] = '菜单顺序';
                    break;
                case 'menuStatus':
                    newColumnMap[column] = '有效状态';
                    break;
            }
        })
    }
}
