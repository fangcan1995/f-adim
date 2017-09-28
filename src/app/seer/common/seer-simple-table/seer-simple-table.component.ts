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

import { CREATE, UPDATE, DELETE, SAVE, CANCEL } from '../seer-table/seer-table.actions';
import { BaseService } from "../../base.service";
@Component({
  selector: 'seer-simple-table',
  templateUrl: './seer-simple-table.component.html',
  styleUrls: ['./seer-simple-table.component.scss'],
  providers: [BaseService]
})
export class SeerSimpleTableComponent implements OnInit {
  @Input() data: Array<any> = [];   //数据数组
  @Input() titles: Array<any> = [];  //标题数组
  @Input() translate; //翻译JSON
  @Input() hideActions;//隐藏事件列
  @Input() hideEditButton;//隐藏编辑按钮
  @Input() displayCopyButton;//显示复制新增按钮
  @Input() displayOriginalData;//翻译不破坏原始数据，但全局搜索不好使
  @Input() rowsOnPageSet: Array<number> = [10, 15, 30]; // 每页可显示条数的枚举
  @Input() rowsOnPage:number = 10;
  @Input() pageNumber:number = 1;

  @Input() primaryKey;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();

  public sortBy = '';

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
    
    if ( _.isArray(this.titles) && this.titles.length ) {
      this.sortBy = this.titles[0].key;
    }
    
    /** 增加的部分 */
    if ( !this.translate ) {
      let transFields: {field: string,dictKeyId?: string}[] = [];
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
  ngOnChanges(): void {
    this.data = _(this.data)
    .map((t, i) => {
      return {
        key: this.primaryKey ? t[this.primaryKey] : i,
        data: t,
        actions: [ UPDATE, DELETE ],
        editState: false,
        copy: _.clone(t),
        editData: _.clone(t),
      }
    })
    .value();
  }
  handleActionsClick($event) {
    console.log($event)
    let { action, item } = $event;
    switch ( action.type ) {
      case UPDATE.type:
        this.edit(item.key);
        break;
      case DELETE.type:
        this.notify.emit({type: action.type, key: item.key});
        break;
      case SAVE.type:
        this.notify.emit({type: action.type, key: item.key});
        break;
      case CANCEL.type:
        this.cancel(item.key)
        break;

    }
    

  }
  public edit(key) {
    let item = _.find(this.data, t => t.key === key)
    item.copy = _.clone(item.data);
    item.editData = _.clone(item.data);

    item.editState = 'EDIT';
    item.actions = [ SAVE, CANCEL ];
  }
  public save(key) {
    let item = _.find(this.data, t => t.key === key);
    item.data = _.clone(item.editData);
    item.editState = false;
    item.actions = [ UPDATE, DELETE ];
  }
  public cancel(key) {
    let item = _.find(this.data, t => t.key === key);
    item.data = _.clone(item.copy);
    item.editState = false;
    item.actions = [ UPDATE, DELETE ]
  }
  public getFormatDataByKey(key) {
    return _.cloneDeep(_.find(this.data, t => t.key === key));
  }
  public getFormatData() {
    return _.cloneDeep(this.data);
  }
  private _sliceData(data, pn, rop) {
    return data.slice((pn-1)*rop, pn*rop)
  }
  getData() {
    let data = this._sliceData(this.data, this.pageNumber, this.rowsOnPage);
    
    if ( this.translate ) {
      _.each(data, item => {
        this.transferKeyWithDict(item, this.translate, 1);
      });
    }
    return data;
  }
  getRowCount() {
    return this.data.length;
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
  create() {

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
    this.changePage.emit({
      pageSize: $event.rowsOnPage,
      pageNumber: $event.pageNumber,
    })
  }
}



