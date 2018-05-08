import {
    Component,
    ViewEncapsulation,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewChild,
    ElementRef,
    TemplateRef
} from '@angular/core';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import * as _ from 'lodash';
import {TREE_PERMISSIONS} from "../../../theme/modules/seer-tree/constants/permissions";
import { CREATE, DELETE_MULTIPLE, EXCHANGE_DEPARTMENT, PUT_LEADER } from './seer-table.actions';
import { ManageService } from "../../../theme/services";
import { BsModalRef, BsModalService } from "ngx-bootstrap";//edit by lily
import {StaffService} from '../../../seer/basic-info/staff/staff.service';
import {json2Tree} from "../../../theme/libs/json2Tree";
import {SeerMessageService} from '../../../theme/services/seer-message.service';
import { concat } from 'rxjs/observable/concat';

export interface TableTitleModel {
    key: string | number,
    label: string,
    isDict?: boolean,
    textAlign?: string, // 默认left 可传 center right
    hidden?: boolean,
    category?: string,
    target?: string,
    href?: string,
}

@Component({
    selector: 'seer-table',
    templateUrl: './seer-table.component.html',
    styleUrls: ['./seer-table.component.scss'],
    providers: [ManageService,StaffService]
})
export class SeerTableComponent implements OnInit {
    @Input() data: Array<any> = [];   //数据数组
    @Input() titles: Array<any>;  //标题数组
    @Input() translate; //翻译JSON
    @Input() hideColumns; //隐藏动态列
    @Input() hideRemoveAll; //隐藏全部删除按钮
    @Input() hideAddButton;//隐藏新增按钮
    @Input() hideActions;//隐藏事件列
    @Input() hideExport;//隐藏导出
    @Input() hidePrint;//隐藏打印
    @Input() showExchangeDepartment;//显示调换部门
    @Input() showputLeader;//显示设置负责人
    @Input() hideRemoveButton; //隐藏删除按钮
    @Input() displayOriginalData;//翻译不破坏原始数据，但全局搜索不好使
    @Input() customActions: Array<any>;
    @Input() rowsOnPageSet: Array<number> = [10, 15, 30]; // 每页可显示条数的枚举
    @Input() rowsOnPage: number = 10;
    @Input() filters: any;
    @Input() showSeq: boolean;
    @Input() hideCheckbox: boolean;
    @Input() hidePagination: boolean;
    @Input() hideHeaderCheckbox: boolean;

    @Input() paginationRules: number = 1; // 0后端分页 1前端分页

    // 当后端分页时，必须传下列3个值， 当前端分页时，传rowsOnPage
    @Input() pageNum: number = 1; // 页码
    @Input() pageSize: number; // 每页显示条数
    @Input() total: number = 0; // 数据总量

    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    @Output() changePage: EventEmitter<any> = new EventEmitter<any>();

    public sortBy: string | number = '';
    public selectedAll = false;
    private multiColumnArray = [];
    private multiColumnOptions: IMultiSelectOption[] = [];
    public multiSelectTexts = {
        checked: '显示',
        checkedPlural: '显示',
        defaultTitle: '请选择',
    }
    public multiSelectSettings = {
        buttonClasses: 'btn btn-outline-dark btn-block',
    }
    @ViewChild('tr') tr: ElementRef
    constructor(
        private _messageService: SeerMessageService,
        private _staffService: StaffService,
        private service: ManageService,
        private modalService: BsModalService //edit by lily
    ) {
        if (!this.rowsOnPage) this.rowsOnPage = this.rowsOnPageSet[0];
    }

    ngOnInit(): void {

        this.titles = _.clone(this.titles);
        this.data = _.clone(this.data);
        if (_.isArray(this.titles) && this.titles.length) {
            this.sortBy = this.titles[0].key;

            let multiColumnArray = [];
            let multiColumnOptions = [];

            _.each(this.titles, title => {

                if (!title.hidden) {
                    multiColumnArray.push(title.key);
                }
                multiColumnOptions.push({
                    id: title.key,
                    name: title.label,
                });
            });
            this.multiColumnArray = multiColumnArray;
            this.multiColumnOptions = multiColumnOptions;
        }

        /** 增加的部分 */
        if (!this.translate) {
            let transFields: { fieldName: string, category?: string,remarks?: string }[] = [];
            _.each(this.titles, title => {
                if (title.isDict) {
                    transFields.push({
                        fieldName: title.key,
                        category: title.category,
                        remarks: title.remarks  //lily
                    });
                }
            });
            this.service.getDictTranslate(transFields)
                .then(res => {
                    if (res.code == 0) this.translate = res.data;
                });
        }
    }
    selectAll(): void {
        let data = this.getData();
        _.each(data, item => {
            item.selected = this.selectedAll;
        })
        this.notify.emit({ type: 'select_all', data: data });
    }

    selectOne(event): void {
        let selectedAll = true;
        _.each(this.getData(), item => {
            if (!item.selected) return selectedAll = false;
        })
        this.selectedAll = selectedAll;
        this.notify.emit({ type: 'select_one', data: event });
    }

    handleClick($event, item) {
        $event.preventDefault();
        this.notify.emit({ type: 'click', data: item })
    }
    handleActionsClick($event) {
        this.notify.emit({ type: $event.action.type, data: $event.item });
    }

    renderSelectedNum() {
        return _.reduce(this.data, (result, n) => result = n['selected'] ? result + 1 : result, 0)
    }
    //批量调换部门
    exchangeDepartment(template): void {
        let data: any  = _.filter(this.data, t => t['selected']);
        console.log(template)
        data = {
            datas:data,
            departmentId:template
        };
        this.notify.emit({ type: EXCHANGE_DEPARTMENT.type, data});
    }
    //设置部门领导人
    putLeader(): void{
        let data = _.filter(this.data, t => t['selected'])
        console.log(data)
        this.notify.emit({ type: PUT_LEADER.type, data });
    }
    deleteMultiple(): void {
        let data = _.filter(this.data, t => t['selected'])
        this.notify.emit({ type: DELETE_MULTIPLE.type, data });
    }
    add(): void {
        this.notify.emit({ type: 'add', data: {} });
    }
    create(): void {
        this.notify.emit({ type: CREATE.type, data: {} })
    }
    //导入模板Excel
    exportTempExcel(): void {
        this.notify.emit({ type: 'export', data: {} });
    }
    //导入Excel
    importExcel(): void {
        this.notify.emit({ type: 'import', data: {} });
    }
    private _sliceData(data, pn, rop) {
        return data.slice((pn - 1) * rop, pn * rop)
    }
    getRowCount() {
        return !this.paginationRules ? this.total : this.getCurData().length;
    }
    getCurData() {
        let data = this.data;
        let dataChain = _(data);
        if (this.paginationRules) {
            if (this.filters) {
                let { globalSearch, ...filters } = this.filters;
                dataChain = dataChain
                    .filter(t => {
                        // 全局搜索 日期不好用
                        if (!globalSearch || !globalSearch.length) return true;
                        globalSearch = _.trim(globalSearch);
                        let item: any = {};
                        _.each(this.titles, y => {
                            item[y.key] = t[y.key]
                        })
                        if (this.translate) {
                            this.transferKeyWithDict(item, this.translate, 1);
                        }
                        for (let key in item) {
                            if (typeof item[key] != 'undefined' && item[key].toString().toLowerCase().indexOf(globalSearch.toString().toLowerCase()) != -1) return true
                        }
                        return false;
                    })
                    .filter(t => {
                        // 高级搜索
                        for (let key in filters) {
                            let filter = filters[key];
                            let curTit = _.find(this.titles, t => t.key === key);
                            if (curTit && curTit.isDict) {
                                if (filter && t[key] != filter) return false;
                            } else if (_.isArray(filter)) {
                                if (!t[key]) return false;
                                if (curTit && curTit.type === 'date') {
                                    if (filter[0] instanceof Date && filter[1] instanceof Date && t[key] < filter[0].getTime() && t[key] > filter[1].getTime()) {
                                        return false;
                                    }
                                }
                                if (t[key] < filter[0] || t[key] > filter[1]) return false;
                            } else {
                                if (!t[key]) return false;
                                if (t[key].toString().toLowerCase().indexOf(_.trim(filter ? filter.toString().toLowerCase() : '')) === -1) return false;
                            }

                        }
                        return true;
                    })

            }
            dataChain = dataChain.map((t, i) => _.set(t, 'SEQ', i + 1))
        } else {
            dataChain = dataChain.map((t, i) => _.set(t, 'SEQ', this.pageSize * (this.pageNum - 1) + i + 1));
        }
        return data = dataChain.value();
    }
    getData() {
        let data = !this.paginationRules ? this._sliceData(_.map(this.data, (t, i) => _.set(t, 'SEQ', this.pageSize * (this.pageNum - 1) + i + 1)), 1, this.pageSize) : this._sliceData(this.getCurData(), this.pageNum, this.rowsOnPage)

        /*if ( this.translate ) {
          _.each(data, item => {
            this.transferKeyWithDict(item, this.translate, 1);
          });
        }*/
        return data;
    }
    filterShownTitles() {
        return _.filter(this.titles, t => !t['hidden'])
    }
    onChangeColumn(event): void {
        console.log(event);
        this.titles = _(this.titles).map(t => _.set(t, 'hidden', event.indexOf(t.key) === -1)).value();
        let multiColumnArray = [];
        let multiKeyValue = {};
        _.each(this.titles, title => {
            if (!title.hidden) {
                multiColumnArray.push(title.key);
                multiKeyValue[title.key] = title.label;
            }

        });
        this.multiColumnArray = multiColumnArray;
        this.notify.emit({
            type: 'hideColumn',
            column: multiKeyValue
        });
    }
    transferKeyWithDict(obj: any, translate_copy: any, direction?: boolean | number): void {
        if (direction) {
            _.each(obj, (v, k) => {
                if (translate_copy[k]) {
                    _.each(translate_copy[k], (cv, ck) => {
                        if (v == cv.itemId) obj[v] = cv.itemName;

                    })
                }
            })
        } else {
            _.each(obj, (v, k) => {
                if (translate_copy[k]) {
                    _.each(translate_copy[k], (cv, ck) => {
                        if (v == cv.itemName) obj[v] = cv.itemId;
                    })
                }
            })
        }

    }
    openLink(event) {
        event.selected = false;
        if (this.translate) this.transferKeyWithDict(event, this.translate);
        this.notify.emit({ type: 'link', data: event });
    }
    exportExcel() {
        let param = {
            "data": this.getData(),
            "titles": this.titles
        };
        /*this.service.exportExcel(param)
        .then(result => {
          this.download(result.json().data);
        });*/
    }

    download(data) {
        const a = document.createElement('a');
        const url = data;
        const filename = 'download.xls';
        a.href = url;
        a.download = filename;
        a.click();
    }

    renderValue(title, value) {
        if (this.translate && this.translate[title.key] && this.translate[title.key].length) {
            _.each(this.translate[title.key], o => {
                if (o.itemId == value) value = o.itemName;
            })
        }
        return value;
    }
    //edit by lily 20180424,
    //该方法可以按照字典中设置的样式显示字段，如发送失败显示红色等
    //说明：为提高效率其实应该改造renderValue方法
    renderClass(title, value) {
      if (this.translate && this.translate[title.key] && this.translate[title.key].length) {
        _.each(this.translate[title.key], o => {
          if (o.itemId == value) value = o.remarks;
        })
      }
      return value;
    }
    onPageChange($event) {
        this.rowsOnPage = $event.rowsOnPage;
        this.pageNum = $event.pageNumber;
        this.changePage.emit({
            pageSize: $event.rowsOnPage,
            pageNum: $event.pageNumber,
        })
      //edit by lily 20180412
      let data = this.getData();
      _.each(data, item => {
        //实际想实现当前页的所有记录都选中时，selectedAll就选中，没有实现
        if(item.selected=false){
          this.selectedAll=false;
        }
      })
      //
      this.selectedAll=false;


    }
    onCustomAction({ type }) {
        let data = _.filter(this.data, t => t['selected'])
        this.notify.emit({ type: type, data });
    }
    //edit by lily 2017-11-8
     /* 模态层 */

     treeNode = [];//组织树
     treePermissions = TREE_PERMISSIONS.NOTIFY | TREE_PERMISSIONS.SHOW_FILTER | TREE_PERMISSIONS.SHOW_ADD_ROOT;

    public modalRef: BsModalRef;

    public openModal(template: TemplateRef<any>) {
      //console.log(template);
      this.modalRef = this.modalService.show(template);
      this.getOrganizations();
    }

    private nodeId: string;
    private nodeName: string;

    onNotice($event) {
      console.log($event);
      let node = $event.node;
      if ($event.eventName == "onFocus") {
        this.nodeName = node.data.name;
        this.nodeId = node.data.id;
      }
    }

    save() {
        console.log(this.nodeId)
        this.exchangeDepartment(this.nodeId)
    }

     /* 获取全部组织机构 */
    getOrganizations() {
        this._staffService.getOrganizations().then((result) => {
        console.log(result);
        let nodes = json2Tree(result.data,
            {parentId: 'pid', children: 'children', id: 'departmentId'},
            [
            {origin: 'departmentName', replace: 'name'},
            {origin: 'departmentId', replace: 'id'}
            ]
        );

        function addIcon(param) {
            param.map(org => {
            if (org.children) {
                org.customIcon = 'ion-ios-people';
                addIcon(org.children);
            }
            else {
                org.customIcon = 'ion-android-people';
                org.children = [];
            }
            })
        }

        addIcon(nodes);
        nodes.map(rootNode => rootNode['expanded'] = true);
        this.treeNode = nodes;
        console.log(this.treeNode);
        }).catch(err => {
        console.log(err);
        this.alertError(err.msg)
        });
    }
    alertError(errMsg: string) {
        // 错误处理的正确打开方式
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: errMsg,
          autoHideDuration: 3000,
        })
      }
}



