import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import * as _ from 'lodash';

import { CREATE, DELETE_MULTIPLE } from './seer-table.actions';
import { BaseService } from "../../base.service";

export interface TableTitleModel {
  key: string | number,
  label: string,
  isDict?: boolean,
  textAlign?: string, // 默认left 可传 center right
  hidden?: boolean,
  dictKeyId?: string,
}

@Component({
  selector: 'seer-table',
  templateUrl: './seer-table.component.html',
  styleUrls: ['./seer-table.component.scss'],
  providers: [BaseService]
})
export class SeerTableComponent implements OnInit {
  @Input() data: Array<any>  = [];   //数据数组
  @Input() titles: Array<any>;  //标题数组
  @Input() translate; //翻译JSON
  @Input() hideColumns; //隐藏动态列
  @Input() hideRemoveAll; //隐藏全部删除按钮
  @Input() hideAddButton;//隐藏新增按钮
  @Input() hideActions;//隐藏事件列
  @Input() hideExport;//隐藏导出
  @Input() hidePrint;//隐藏打印
  @Input() hideRemoveButton; //隐藏删除按钮
  @Input() displayOriginalData;//翻译不破坏原始数据，但全局搜索不好使
  @Input() customActions: Array<any>;
  @Input() rowsOnPageSet: Array<number> = [10, 15, 30]; // 每页可显示条数的枚举
  @Input() rowsOnPage:number = 10;

  @Input() paginationRules:number = 1; // 0后端分页 1前端分页

  // 当后端分页时，必须传下列3个值， 当前端分页时，传rowsOnPage
  @Input() pageNum:number = 1; // 页码
  @Input() pageSize:number; // 每页显示条数
  @Input() total:number = 0; // 数据总量

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();

  public sortBy: string | number = '';
  public selectedAll = false;
  private multiColumnArray: IMultiSelectOption[] = [];
  private multiColumnOptions = [];
  public multiSelectTexts = {
    checked: '显示',
    checkedPlural: '显示',
    defaultTitle: '请选择',
  }
  public multiSelectSettings = {
    buttonClasses: 'btn btn-outline-dark btn-block',
  }
  constructor(
    private service: BaseService<any>,
  ) { 
    if( !this.rowsOnPage ) this.rowsOnPage = this.rowsOnPageSet[0];
  }

  ngOnInit(): void {
    this.titles = _.clone(this.titles);
    this.data = _.clone(this.data);
    if ( _.isArray(this.titles) && this.titles.length ) {
      this.sortBy = this.titles[0].key;

      let multiColumnArray = [];
      let multiColumnOptions = [];

      _.each(this.titles, title => {

        if ( !title.hidden ) {
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
    if ( !this.translate ) {
      let transFields: {field: string | number,dictKeyId?: string}[] = [];
      _.each(this.titles, title => {
        if ( title.isDict ) {
          transFields.push({
            field: title.key,
            dictKeyId: title.dictKeyId
          });
        }
      });
      this.service.getDictTranslate(transFields)
      .then(res => {
        if ( res.success ) this.translate = res.data;
      });
    }
  }
  selectAll(): void {
    let data = !this.paginationRules ? this._sliceData(this.data, 1, this.pageSize) : this._sliceData(this.data, this.pageNum, this.rowsOnPage)
    _.each(data, item => {
      item.selected = this.selectedAll;
    })
    this.notify.emit({type: 'select_all', data: data});
  }

  selectOne(event): void {
    let selectedAll = true;
    _.each(this.data, item => {
      if ( !item.selected ) return selectedAll = false;
    })
    this.selectedAll = selectedAll;
    this.notify.emit({type: 'select_one', data: event});
  }


  handleActionsClick($event) {
    this.notify.emit({type: $event.action.type, data: $event.item});
  }

  renderSelectedNum() {
    return _.reduce(this.data, (result, n) => result = n['selected'] ? result + 1 : result, 0)
  }

  deleteMultiple(): void {
    let data = _.filter(this.data, t => t['selected'])
    this.notify.emit({ type: DELETE_MULTIPLE.type, data });
  }
  add(): void {
    this.notify.emit({type: 'add', data: {}});
  }
  create(): void {
    this.notify.emit({ type: CREATE.type, data: {} })
  }
  //导入模板Excel
  exportTempExcel() : void {
    this.notify.emit({type: 'export', data: {}});
  }
  //导入Excel
  importExcel(): void {
    this.notify.emit({type: 'import', data: {}});
  }
  private _sliceData(data, pn, rop) {
    return data.slice((pn-1)*rop, pn*rop)
  }
  getRowCount() {
    return !this.paginationRules ? this.total : this.data.length;
  }
  getData() {
    let data = !this.paginationRules ? this._sliceData(this.data, 1, this.pageSize) : this._sliceData(this.data, this.pageNum, this.rowsOnPage)
    if ( this.translate ) {
      _.each(data, item => {
        this.transferKeyWithDict(item, this.translate, 1);
      });
    }
    return data;
  }
  filterShownTitles() {
    return _.filter(this.titles, t => !t['hidden'])
  }
  onChangeColumn(event): void {
    this.titles = _(this.titles).map(t => _.set(t, 'hidden', event.indexOf(t.key) === -1)).value();
    let multiColumnArray = [];
    _.each(this.titles, title => {
      if ( !title.hidden ) {
        multiColumnArray.push(title.key);
      }

    });
    this.multiColumnArray = multiColumnArray;
  }
  transferKeyWithDict(obj: any, translate_copy: any, direction?: boolean | number): void {
    if ( direction ) {
      _.each(obj, (v, k) => {
        if (translate_copy[k]) {
         _.each(translate_copy[k], (cv, ck) => {
            if ( v == cv.dictValueId ) v = cv.dictValueName;
         })
        }
      })
    } else {
      _.each(obj, (v, k) => {
        if (translate_copy[k]) {
         _.each(translate_copy[k], (cv, ck) => {
            if ( v == cv.dictValueName ) v = cv.dictValueId;
         })
        }
      })
    }

  }
  openLink(event) {
    event.selected = false;
    if ( this.translate ) this.transferKeyWithDict(event, this.translate);
    this.notify.emit({type: 'link', data: event});
  }
  exportExcel() {
    let param = {
      "data": this.getData(),
      "titles": this.titles
    };
    this.service.exportExcel(param)
    .then(result => {
      this.download(result.json().data);
    });
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
    if ( this.translate && this.translate[title.key] && this.translate[title.key].length ) {
      _.each(this.translate[title.key], o => {
        if ( o.dictValueId == value ) value = o.dictValueName;
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
  }
  onCustomAction({type}) {
    let data = _.filter(this.data, t => t['selected'])
    this.notify.emit({type: type, data});
  }
}



