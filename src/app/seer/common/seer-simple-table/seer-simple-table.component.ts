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
    .map(t => {
      return {
        data: t,
        actions: [ UPDATE, DELETE ],
        editState: false,
        copy: _.clone(t),
      }
    })
    .value();
  }
  handleActionsClick($event) {
    switch ($event.action.type) {
      case UPDATE.type:
        $event.item.editState = 'EDIT';
        $event.item.actions = [ SAVE, CANCEL ]
        // this.notify.emit({type: $event.action.type, data: $event.item});
        break;
      case DELETE.type:
        // this.notify.emit({type: $event.action.type, data: $event.item});
        break;
      case SAVE.type:
        $event.item.data = _.clone($event.item.copy);
        $event.item.editState = false;
        $event.item.actions = [ UPDATE, DELETE ];
        break;
      case CANCEL.type:
        $event.item.copy = _.clone($event.item.data);
        $event.item.editState = false;
        $event.item.actions = [ UPDATE, DELETE ]
        break;
    }

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



