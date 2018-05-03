
import { Router } from "@angular/router";
import { Component, ViewChild, OnDestroy } from "@angular/core";
// OrgManageService
import { GlobalState } from "../../../global.state";
import { json2Tree } from "../../..//theme/libs/json2Tree";
import { TREE_PERMISSIONS } from "../../../theme/modules/seer-tree/constants/permissions";
import { TREE_EVENTS } from "../../../theme/modules/seer-tree/constants/events";
import { SeerTree } from "../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import { infoModle } from "./infoModle";
import { formatDate } from "ngx-bootstrap/bs-moment/format";
/*import any = jasmine.any;*/
import { DynamicComponentLoader } from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { InfoPublishService } from "./info-publish.service";
import { SeerDialogService, SeerMessageService } from '../../../theme/services'
import { UPDATE, DELETE, PUBLISHED, UNPUBLISHED } from "../../common/seer-table/seer-table.actions"
import * as _ from 'lodash';

import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';


@Component({
    templateUrl: './info-publish.component.html',
    styleUrls: ['./info-publish.component.scss'],
})
export class InfoPublishComponent {
    isLoading: boolean = true;
    title = "栏目列表";
    tableTitle: string = "文章列表";
    hasGlobalFilter = true;
    @ViewChild('modal') modal: ModalDirective;
    source = [];
    filterRowLength = 2;
    data = [];
    root: any = {};
    titles = [
        { key: 'affTypeName', label: '所属栏目', isDict: true, category: 'NEWS_TYPE' },
        { key: 'title', label: '文章标题' },
        { key: 'updateUser', label: '发布用户' },
        { key: 'updateTime', label: '更新时间', type: 'date-time' },
        { key: 'status', label: '发布状态' },
        { key: 'viewCounts', label: '浏览次数' },
    ];
    event: any = {};
    modalInfo: any = {};
    editType: any = '';
    filters = [
        {
            key: 'title',
            label: '文章标题',
            type: 'input.text'
        },
        {
            key: 'updateUser',
            label: '发布用户',
            type: 'input.text'
        },
        {
            key: 'tplName',
            label: '状态',
            type: 'select',
            options: [
                { content: '全部' },
                { value: '1', content: '已发布' },
                { value: '0', content: '未发布' },
            ]
        },
        {
            key: 'effectTime',
            label: '生效时间',
            groups: [
                {
                    type: 'datepicker',
                },
                {
                    type: 'datepicker',
                },
            ],
            groupSpaces: ['至']
        }
    ];



    /* 更新信息缓存 */
    info = {
        parentId: '',
        parentIds: '',
        affTypeName: '',
        id: ''
    };

    cacheMemory = {

    };

    pageInfo: any = {
        pageNum: 1,
        pageSize: 100000,
        total: 1000,
        typeId: '',
        globalSearch: '',
        sortBy: '',
        isRoot: 1,
        status: '',
        updateUser: '',
        title: '',
        excelmaps: {
            affTypeName: '所属栏目',
            title: '文章标题',
            updateUser: '发布用户',
            updateTime: '更新时间',
            status: '发布状态',
            viewCounts: '浏览次数',
        }
    };


    //组织树
    treePermissions = TREE_PERMISSIONS.NOTIFY | TREE_PERMISSIONS.ADD | TREE_PERMISSIONS.EDIT | TREE_PERMISSIONS.DELETE | TREE_PERMISSIONS.DRAG | TREE_PERMISSIONS.SHOW_FILTER | TREE_PERMISSIONS.SHOW_ADD_ROOT;
    treeNode = [];


    //右侧表格列表
    tableSource = [];

    staffId: string;

    constructor(
        protected service: InfoPublishService,
        private _dialogService: SeerDialogService,
        private _messageService: SeerMessageService,
        private _router: Router,
        private _state: GlobalState,
        private _modalService: BsModalService
    ) {
        this._state.subscribe("orgStaffState", (a) => {
            this.getColumnListById(this.staffId);
        })
    }


    /* 初始化渲染 */
    ngOnInit() {
        // 初始化树形结构
        this.getColumnTree();
        // 获取右侧表格数据
        console.log('=====================================');
        console.log(this.pageInfo);
        this.getColumnList(this.pageInfo);
    }

    /* 组件销毁 */
    ngOnDestroy(): void {
        this._state.unsubscribe("orgStaffState");
    }



    /* --------------------------------------------------------------------------------------------- */
    /* 栏目树的方法 */
    /* --------------------------------------------------------------------------------------------- */

    /* 获取全部栏目树 */
    getColumnTree() {
        this.service.getAllColumnTree().then((result) => {
            result.data.map(org => org['children'] = []);
            result.data.map((x, i) => {
                let parentIds = x.parentIds.split(',');
                if (parentIds.length === 3) {
                    x.isLast = true;
                }
            });
            let nodes = json2Tree(result.data, { parentId: 'parentId', children: 'children', id: 'id' }, [{ origin: 'affTypeName', replace: 'name' }]);
            nodes.map(rootNode => rootNode['expanded'] = true);
            this.treeNode = nodes;
            console.log(this.treeNode);
        });
    }

    /* 栏目树结构监控的事件 */
    onNotify($event) {
        console.log($event);

        /* 组织被点击在焦点上 TREE_EVENTS.onFocus */
        if ($event.eventName == TREE_EVENTS.onFocus) {
            /* 当树机构的节点在焦点事件时，获取对应节点的右侧表数据 */

            console.log($event.node.data.id);
            this.pageInfo.typeId = $event.node.data.id;
            this.pageInfo.isRoot = $event.node.data.isRoot;
            this.getColumnList(this.pageInfo);

        }

        /* 根据组织机构查询人员 TREE_EVENTS.onActivate */
        if ($event.eventName == TREE_EVENTS.onActivate) {

        }
        /* 删除组织机构 TREE_EVENTS.onDeleteNode */
        if ($event.eventName == TREE_EVENTS.onDeleteNode) {
            this.service.deleteColumn($event.node.data.id).then(result => {
                console.log(result);
                this.alertSuccess(result.message);
                this.getColumnTree();
            }).catch(err => {
                this.alertError(err.msg);
                if(err.code === 406) {
                    this.getColumnTree();
                }
            })
        }

        /* 新增组织结构 TREE_EVENTS.onAddNewNode */
        if ($event.eventName == TREE_EVENTS.onAddNewNode) {
            let event = $event.node;
            let test = event.parent.data.id.toString().indexOf(event.parent.data.parentIds.toString());
            console.log(event.parent.data.id);
            let newPoint = {
                affTypeName: event.data.name,
                parentId: event.parent.data.id,
                parentIds: test === 0 ? event.parent.data.parentIds : event.parent.data.parentIds + ',' + event.parent.data.id
            };
            console.log(newPoint);
            /* this.service.addColumn(newPoint).then(result => {
                console.log(result);
                this.alertSuccess(result.message);
                this.getColumnTree();
            }) */



        }

        /*/!* 双击 TREE_EVENTS.onDoubleClick *!/
        if($event.eventName == TREE_EVENTS.onDoubleClick) {
    
        }*/

        /* 移动组织机构 TREE_EVENTS.onMoveNode */
        if ($event.eventName == TREE_EVENTS.onMoveNode) {
            this.info.affTypeName = $event.node.data.name;
            this.info.id = $event.node.data.id;
            this.info.parentId = $event.to.parent.data.id;
            this.info.parentIds = $event.to.parent.data.parentIds + ',' + $event.to.parent.data.id;
            console.log(this.info);
            this.service.editColumn(this.info).then(result => {
                console.log(result);
                this.alertSuccess(result.message);
                this.getColumnTree();
            });
        }

        /* 组织机构重命名 TREE_EVENTS.onRenameNode */
        if ($event.eventName == TREE_EVENTS.onRenameNode) {
            this.info.affTypeName = $event.node.data.name;
            this.info.id = $event.node.data.id;
            this.info.parentId = $event.node.data.parentId;
            this.info.parentIds = $event.node.data.parentIds;
            console.log(this.info);
            /* this.service.editColumn(this.info).then(result => {
                this.alertSuccess(result.message);
                this.getColumnTree();
            }); */
        }

        /* 新增按钮被点击 */
        if ($event.eventName === TREE_EVENTS.onClickNew || $event.eventName === TREE_EVENTS.onClickEdit) {
            this.event = $event;
            this.handleModalShown();
        }

    }

    /* 全局搜索 */
    handleFiltersChanged($event) {
        this.pageInfo.globalSearch = $event.globalSearch ? $event.globalSearch : '';
        this.pageInfo.status = $event.tplName ? $event.tplName : '';
        if (_.isArray($event.effectTime)) {
            this.pageInfo.updateTimeStart = $event.effectTime[0] ? (formatDate($event.effectTime[0], 'YYYY-MM-DD hh:mm:ss')) : null;
            this.pageInfo.updateTimeEnd = $event.effectTime[1] ? (formatDate($event.effectTime[1], 'YYYY-MM-DD hh:mm:ss')) : null;
        }
        this.pageInfo.title = $event.title;
        this.pageInfo.updateUser = $event.updateUser;
        this.getColumnList(this.pageInfo);
    }

    /* 搜索按钮 */
    handleSearchBtnClicked($event) {
        this.pageInfo.globalSearch = $event.globalSearch ? $event.globalSearch : '';
        this.pageInfo.status = $event.tplName ? $event.tplName : '';
        if (_.isArray($event.effectTime)) {
            this.pageInfo.updateTimeStart = $event.effectTime[0] ? (formatDate($event.effectTime[0], 'YYYY-MM-DD hh:mm:ss')) : null;
            this.pageInfo.updateTimeEnd = $event.effectTime[1] ? (formatDate($event.effectTime[1], 'YYYY-MM-DD hh:mm:ss')) : null;
        }
        this.getColumnList(this.pageInfo);
    }

    /*--------------------------------------------------------------------------------------------*/
    /* 右侧列表相关的 */
    /*--------------------------------------------------------------------------------------------*/

    /* 右侧表格渲染 */
    getColumnList(params?): void {
        this.service.getColumnList(params)
            .then(res => {
                this.pageInfo.pageNum = res.data.pageNum;  //当前页
                this.pageInfo.pageSize = res.data.pageSize; //每页记录数
                this.pageInfo.total = res.data.total; //记录总数
                this.source = res.data.list;
                this.source.map(x => {
                    x.status = x.status === 0 ? '未发布' : '已发布';
                });
                //this.source = _.map(this.source, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
                this.source = _.map(this.source, r => {
                    let status = r.status;
                    let actions;
                    switch (status) {
                        case '未发布':
                            actions = [UPDATE, DELETE, PUBLISHED];
                            break;
                        case '已发布':
                            actions = [UPDATE, DELETE, UNPUBLISHED];
                            break;
                    }
                    return _.set(r, 'actions', actions);
                });
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            });
    }

    /* 右侧表格操作，对应的 */
    onChange(message): void {
        const type = message.type;
        let data = message.data;
        let column = message.column;
        console.log(data);
        switch (type) {
            case 'hideColumn':
                this.pageInfo.excelmaps = column;
                break;
            case 'create':
                this._router.navigate(['/content/info-publish/add']);
                break;
            case 'update':
                this._router.navigate(['/content/info-publish/edit', message.data.id]);
                break;
            case 'published':
                this._dialogService.confirm('确定发布么？')
                    .subscribe(action => {
                        if (action === 1) {
                            console.log({ id: data.id, status: data.status === '未发布' ? '1' : '0' });
                            this.service.patch({ id: data.id, status: data.status === '未发布' ? '1' : '0' }).then(result => {
                                this.alertSuccess(result.message);
                                console.log(this.pageInfo);
                                this.getColumnList(this.pageInfo);
                            })
                        }
                    });
                break;
            case 'unpublished':
                this._dialogService.confirm('确定取消发布么？')
                    .subscribe(action => {
                        if (action === 1) {
                            console.log({ id: data.id, status: data.status === '未发布' ? '1' : '0' });
                            this.service.patch({ id: data.id, status: data.status === '未发布' ? '1' : '0' }).then(result => {
                                this.alertSuccess(result.message);
                                console.log(this.pageInfo);
                                this.getColumnList(this.pageInfo);
                            })
                        }
                    });
                break;
            case 'delete':
                this._dialogService.confirm(`确定删除 #${data.title}# 吗？`, 
                    [
                        {
                            type: 1,
                            text: '确认删除'
                        },
                        {
                            type: 0,
                            text: '暂不删除'
                        },
                    ]).subscribe(action => {
                        if (action === 1) {
                            //this.pageInfo.typeId = data.typeId;
                            this.service.deleteArticle(data.id).then(result => {
                                console.log(result);
                                this.alertSuccess(result.message);
                                console.log(this.pageInfo);
                                this.getColumnList(this.pageInfo);
                            }).catch(err => {
                                console.log(err);
                                this.alertError(err.message);
                            });
                        }
                    });

                break;
            case 'delete_all':
                let ids = _(data).map(t => t.id).value();
                break;
            case 'export':
                console.log(this.pageInfo);
                this.service.exportForm(this.pageInfo).then(res => {
                    let blob = res.blob();
                    let a = document.createElement('a');
                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = '新闻管理' + '.xls';
                    a.click();
                    window.URL.revokeObjectURL(url);
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
                break;
        }
    }






    /*-----------------------------------------------------------------------------------------*/
    /* 特殊方法，不敢动 (初始化和销毁组件)*/
    /*-----------------------------------------------------------------------------------------*/
    /* 通过栏目id获得表数据 */
    getColumnListById(orgId) {
        this.service.getColumnListById(orgId).then((result) => {
            this.pageInfo.pageNum = result.data.pageNum;  //当前页
            this.pageInfo.pageSize = result.data.pageSize; //每页记录数
            this.pageInfo.total = result.data.total; //记录总数
            this.source = result.data.list;
            this.source = _.map(this.source, r => _.set(r, 'actions', [UPDATE, DELETE]));
        });
    }






    alertSuccess(info: string) {
        this._messageService.open({
            icon: 'fa fa-check',
            message: info,
            autoHideDuration: 3000,
        }).onClose();
    };

    alertError(errMsg: string) {
        // 错误处理的正确打开方式
        this._messageService.open({
            icon: 'fa fa-times-circle',
            message: errMsg,
            autoHideDuration: 3000,
        })
    };


    handleModalShown() {
        this.modalInfo = {};
        this.editType = this.event.eventName;
        if (this.event.eventName === TREE_EVENTS.onClickEdit) {
            this.modalInfo.affTypeName = this.event.node.data.name;
            this.modalInfo.affType = this.event.node.data.affType;
            this.modalInfo.affContentType = this.event.node.data.affContentType;

            this.modalInfo.id = this.event.node.data.id;
            this.modalInfo.parentId = this.event.node.data.parentId;
            this.modalInfo.parentIds = this.event.node.data.parentIds;
        }
        else {
            this.modalInfo.parentId = this.event.node.data.id;
            this.modalInfo.parentIds = this.event.node.data.parentIds + ',' + this.event.node.data.id;
        }
        this.modal.show();
    }

    handleAffSubmit() {
        console.log(this.modalInfo);
        console.log(this.editType);
        if(this.editType === TREE_EVENTS.onClickEdit) {
            this.service.editColumn(this.modalInfo)
                .then(res => {
                    this.handleModalHide();
                    this.alertSuccess(res.message);
                    this.getColumnTree();
                }).catch(err => {
                    this.alertError(err.message || '操作失败')
                })
        }
        else {
            this.service.addColumn(this.modalInfo)
                .then(res => {
                    this.handleModalHide();
                    this.alertSuccess(res.message);
                    this.getColumnTree();
                }).catch(err => {
                    this.alertError(err.message || '操作失败')
                })
        }
    }

    handleModalHide() {
        this.modal.hide();
    }

}
