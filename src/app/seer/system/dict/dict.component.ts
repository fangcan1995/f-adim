import {
    Component,
    ViewEncapsulation,
    OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { DictService } from "./dict.service";
import * as _ from 'lodash';
import { CREATE, COPY_CREATE, UPDATE, DELETE, DELETE_MULTIPLE } from "../../common/seer-table/seer-table.actions";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../theme/services/seer-message.service';
@Component({
    templateUrl: './dict.component.html',
    styleUrls: ['./dict.component.scss'],
})
export class DictComponent implements OnInit {
    hasGlobalFilter = true;
    isLoading: boolean = true;
    filters = [
        {
            key: 'category',
            label: '类型编号',
            type: 'input.text',
        },
        {
            key: 'categoryName',
            label: '类型名称',
            type: 'input.text',
        },
        {
            key: 'itemName',
            label: '字典名称',
            type: 'input.text',
        },
        {
            key: 'delFlag',
            label: '有效状态',
            isDict: true,
            type: 'select',
            category: 'DICT_DEL_FLAG',
        },

    ];

    titles = [
        {
            key: 'category',
            label: '类型编号',
        },
        {
            key: 'categoryName',
            label: '类型名称',
        },
        {
            key: 'itemId',
            label: '字典编号',
        },
        {
            key: 'itemName',
            label: '字典名称',
        },
        {
            key: 'itemSort',
            label: '排序',
        },
        {
            key: 'delFlag',
            label: '有效状态',
            isDict: true,
            category: 'DICT_DEL_FLAG'
        },
        {
            key: 'updateUser',
            label: '更新用户',
        },
    ];

    pageInfo = {
        pageNum: 1,
        pageSize: 100000,
        total: 1000,
        globalSearch: '',
        sortBy: '-updateTime',
    }

    pageSize: number = 10000;
    dicts = [];
    tableFilters = {};
    constructor(
        private _dictService: DictService,
        private _dialogService: SeerDialogService,
        private _messageService: SeerMessageService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.getList(this.pageInfo);
    }

    /*获取列表*/
    getList(params): void {
        this._dictService.getDicts(params, true)
            .then(res => {
                if (res.code == 0) {
                    this.dicts = res.data || [];
                    this.dicts = _.map(this.dicts, r => _.set(r, 'actions', [COPY_CREATE, UPDATE, DELETE]));
                    this.isLoading = false;
                    console.log(this.dicts);
                } else {
                    this.showError(res.msg || '获取字典失败');
                    this.isLoading = false;
                }
            });
    }
    /*更新*/
    handleNotify(message): void {
        const { type, data } = message;
        switch (type) {
            case CREATE.type:
                this._router.navigate(['/system/dict/add']);
                break;
            case COPY_CREATE.type:
                let queryParams = {
                    category: data.category,
                    categoryName: data.categoryName,
                    itemId: data.itemId,
                    itemName: data.itemName,
                    itemSort: data.itemSort,
                    delFlag: data.delFlag
                }
                this._router.navigate(['/system/dict/add'], { queryParams });
                break;
            case UPDATE.type:
                this._router.navigate([`/system/dict/edit/${data.id}`]);
                break;
            case DELETE.type:
                this._dialogService.confirm('确定删除吗？')
                    .subscribe(action => {
                        if (action === 1) {
                            this._dictService
                                .deleteOne(message.data.id)
                                .then((res) => {
                                    this.showSuccess(res.msg || '删除字典成功')
                                    this.getList(this.pageInfo);
                                })
                                .catch(err => {
                                    this.showError(err.msg || '删除字典失败')
                                });
                        }
                    })
                break;
            case DELETE_MULTIPLE.type:
                let ids = _(data).map(t => t.id).value();
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
        this.tableFilters = $event;
        this.pageInfo = {
            ...this.pageInfo,
            globalSearch: $event.globalSearch
        }
        this.getList(this.pageInfo);
    }

}

