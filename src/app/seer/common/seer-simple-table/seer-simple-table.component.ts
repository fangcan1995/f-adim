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

import { CREATE, UPDATE, DELETE, SAVE, CANCEL, DOWNLOAD, PREVIEW } from '../seer-table/seer-table.actions';
import { ManageService } from '../../../theme/services';
import { formatDate } from "ngx-bootstrap/bs-moment/format";

@Component({
  selector: 'seer-simple-table',
  templateUrl: './seer-simple-table.component.html',
  styleUrls: [ './seer-simple-table.component.scss' ],
  providers: [ ManageService ],
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
  @Input() hidePagination: boolean;
  @Input() hideAddButton;//隐藏新增按钮
  @Input() createDistabled: boolean = true;//新增按钮不可用
  @Input() primaryKey;
  @Input() actions: Array<any> = [];
  @Input() showSeq:boolean;
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
    private _service:ManageService,
  ) { 
    if( !this.rowsOnPage ) this.rowsOnPage = this.rowsOnPageSet[0];
  }

  ngOnInit(): void {
    this.titles = _.clone(this.titles);
    console.log(this.titles)
    if ( _.isArray(this.titles) && this.titles.length ) {
      this.sortBy = this.titles[0].key;
    }
    
    /** 增加的部分 */
    if ( !this.translate ) {
      let transFields: {fieldName: string,category?: string}[] = [];
      _.each(this.titles, title => {
        if ( title.isDict ) {
          transFields.push({
            fieldName: title.key,
            category: title.category
          });
        }
      });
      this._service.getDictTranslate(transFields)
      .then(res => {
        if ( res.code == 0 ) this.translate = res.data;
      });
    }
  }
  ngOnChanges(): void {
    this.data = _(this.data)
    .map((t, i) => {
      return {
        key: i,//this.primaryKey ? t[this.primaryKey] : i,
        data: t,
        actions: this.actions,
        editState: false,
        copy: _.clone(t),
        editData: _.clone(t),
      }
    })
    .value();
  }
  handleActionsClick($event) {
    let { action, item } = $event;

    
    switch ( action.type ) {

      case UPDATE.type:
        console.log(item.data.endTime)
        // item.data.startTime = formatDate(item.data.startTime, 'YYYY-MM-DD hh:mm:ss');
        // item.data.endTime = formatDate(item.data.endTime, 'YYYY-MM-DD hh:mm:ss');
        if(item.data.endTime){
          item.data.endTime = item.data.endTime  ? item.data.endTime.replace(/-/g, "/") : '';
          item.data.startTime = item.data.startTime  ? item.data.startTime.replace(/-/g, "/") : ''; 
        }else{
          item.data.startTime = formatDate(item.data.startTime, 'YYYY-MM-DD hh:mm:ss');
          item.data.endTime = formatDate(item.data.endTime, 'YYYY-MM-DD hh:mm:ss');
        }
                     
        this.edit(item.key);
    
        break;
      case DELETE.type:
        this.notify.emit({type: action.type, key: item.key});
        break;
      case SAVE.type:
      console.log(item)
        // item.data.endTime = item.data.endTime !== 'undefined' ? new Date(item.data.endTime.replace(/-/g, "/")) : ''; 
        this.notify.emit({type: action.type, key: item.key});
        break;
      case CANCEL.type:
        console.log(item)
        this.notify.emit({type: action.type, key: item.key});
        this.cancel(item.key)
        break;
      case CREATE.type:
        this.create();
        break;
      case DOWNLOAD.type:
        this.notify.emit({type: action.type, key: item.key});
        break;
      case PREVIEW.type:
        this.notify.emit({type: action.type, key: item.key});
        break;
    }
    

  }
  public edit(key) {
    let item = _.find(this.data, t => t.key === key);
    item.copy = _.clone(item.data);
    item.editData = _.clone(item.data);

    item.editState = 'EDIT';
    item.actions = [ SAVE, CANCEL ];
  }
  public save(key, data?) {
    let item = _.find(this.data, t => t.key === key);
    this.createDistabled = true
    if ( data ) {
      item.data = _.clone(data);
    } else {
      item.data = _.clone(item.editData);
    }
    item.editState = false;
    item.actions = [ UPDATE, DELETE ];
  }
  public create() {
    let keys = _.map(this.data, t => t['key']);
    let maxKey = isNaN(_.max(keys)) ? 0 : _.max(keys);
    this.createDistabled = false
    let data = {};
     _.each(this.titles, t => {
      data[t.key] = null;
    })
    this.data.unshift({
      key: maxKey + 1,
      copy: data,
      editData: data,
      data: data,
      actions: [ SAVE, CANCEL ],
      editState: 'CREATE',
    })
    console.log(this.data)
  }
  public cancel(key) {
    let item = _.find(this.data, t => t.key === key);
    console.log(item)
    this.createDistabled = true
    if ( item.editState === 'CREATE' ) {
      _.remove(this.data, t => t.key === key);
    } else {
      item.data = _.clone(item.copy);
      item.editState = false;
      item.actions = [ UPDATE, DELETE ]
    }
    
  }
  public delete(key) {
    _.remove(this.data, t => t.key === key);
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
    let data = this.hidePagination ? this.data : this._sliceData(this.data, this.pageNumber, this.rowsOnPage);
    
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
            if ( v == cv.itemId ) obj[v] = cv.itemName;

          })
        }
      })
    } else {
      _.each(obj, (v, k) => {
        if (translate_copy[k]) {
          _.each(translate_copy[k], (cv, ck) => {
            if ( v == cv.itemName ) obj[v] = cv.itemId;
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

  renderValue(title, value) {
    if ( this.translate && this.translate[title.key] && this.translate[title.key].length ) {
      _.each(this.translate[title.key], o => {
        if ( o.itemId == value ) value = o.itemName;
      })
    }
    return value;
  }
  onPageChange($event) {
    this.rowsOnPage = $event.rowsOnPage;
    this.pageNumber = $event.pageNumber;
    this.changePage.emit({
      pageSize: $event.rowsOnPage,
      pageNumber: $event.pageNumber,
    })
  }
}



