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
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { BaseService } from "../../base.service";

@Component({
  selector: 'seer-table',
  templateUrl: './seer-table.component.html',
  styleUrls: ['./seer-table.component.scss'],
  providers: [BaseService]
})
export class SeerTableComponent implements OnInit {
  @Input() data;   //数据数组
  @Input() titles;  //标题数组
  @Input() translate; //翻译JSON
  @Input() hideColumns; //隐藏动态列
  @Input() hideRemoveAll; //隐藏全部删除按钮
  @Input() selectButtonText;//选择按钮文字
  @Input() hideAddButton;//隐藏新增按钮
  @Input() hideActions;//隐藏事件列
  @Input() hideExport;//隐藏导出
  @Input() hidePrint;//隐藏打印
  @Input() hideRemoveButton; //隐藏删除按钮
  @Input() hideFilter;//隐藏全局过滤
  @Input() hideEditButton;//隐藏编辑按钮
  @Input() displayDetailButton;//显示详情按钮
  @Input() displayCopyButton;//显示复制新增按钮
  @Input() addNewButton; //新增自定义按钮
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = '';
  public selectedAll = false;
  public action;
  public alert_content = '';
  public alert_id;

  private multiColumnArray: IMultiSelectOption[] = [];
  private multiColumnOptions = [];

  public currentDeleteEvents = [];
  public currentDeleteEvent;
  public multiSelectTexts = {
    checked: '选中',
    checkedPlural: '选中',
    defaultTitle: '请选择',
  }
  constructor(
    private service: BaseService<any>,
  ) { }

  ngOnInit(): void {

    if ( _.isArray(this.titles) && this.titles.length ) {
      this.sortBy = this.titles[0].key;

      let multiColumnArray = [];
      let multiColumnOptions = [];

      _.each(this.titles, title => {
        
        if ( !title.hidden ) {
          multiColumnOptions.push(title.key);
        }
        multiColumnArray.push({
          id: title.key,
          name: title.label,
        });
      });
      this.multiColumnArray = multiColumnArray;
      this.multiColumnOptions = multiColumnOptions;
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

  selectAll(value): void {
    value = !value;
    _.each(this.data, item => {
      item.selected = value;
    })
    this.notify.emit({type: 'select_all', data: this.data});
  }
  selectOne(event): void {
    let selectedAll = true;
    _.each(this.data, item => {
      if ( !item.selected ) return selectedAll = false;
    })
    this.selectedAll = selectedAll;
    this.notify.emit({type: 'select_one', data: event});
  }
  removeAll(): void {
    let list = [];
    _.each(this.data, item => {
      if ( item.selected ) list.push(item);
    });

    this.alert_id = 'delete_all';
    this.alert_content = '确定删除吗?';
    this.action = 'show';
    this.currentDeleteEvents = list;
  }

  handleActionsClick($event) {
    if ( $event.action.action || this._actions[$event.action.action] ) {
      return this._actions[$event.action.action].call(this, {type: $event.action.type, data: $event.item});
    }
    this.notify.emit({type: $event.action.type, data: $event.item});
  }

  renderSelectedNum() {
    return _.reduce(this.data, (result, n) => result = n['selected'] ? result + 1 : result, 0)
  }
  renderSelectButtonText() {
    return !this.selectButtonText ? '选择' : this.selectButtonText;
  }
  private _actions = {
    remove(event): void {
      this.alert_id = 'delete';
      this.alert_content = '确定删除吗?';
      this.action = 'show';
      this.currentDeleteEvent = event.data;
      /**/
    },
    detail(event) {
      event.data.selected = false;
      if ( this.translate ) this.transferKeyWithDict(event, this.translate);
      this.notify.emit({type: 'detail', data: event.data});
    },
    copyadd(event) {
      event.data.selected = false;
      if ( this.translate ) this.transferKeyWithDict(event, this.translate);
      this.notify.emit({type: 'copy_add', data: event.data});
    },
    edit(event): void {
      event.data.selected = false;
      if ( this.translate ) this.transferKeyWithDict(event, this.translate);
      this.notify.emit({type: 'edit', data: event.data});
    }
  } 

  onSelectAlert(event){
    if ( event.type == 'save' ) {
      if ( this.alert_id == 'delete_all' ) {
        this.notify.emit({type: 'remove_all', data: this.currentDeleteEvents});
      } else if ( this.alert_id == 'delete' ) {
        this.notify.emit({type: 'remove', data: this.currentDeleteEvent});
      }
      this.action = false;
    } else if ( event.type == 'cancel' ) {
      this.action = false;
    }
  }

  add(): void {
    this.notify.emit({type: 'add', data: {}});
  }
  //导入模板Excel
  exportTempExcel() : void {
    this.notify.emit({type: 'export', data: {}});
  }
  //导入Excel
  importExcel(): void {
    this.notify.emit({type: 'import', data: {}});
  }

  getData() {
    if ( this.translate ) {
      _.each(this.data, item => {
        this.transferKeyWithDict(item, this.translate, 1);
      });
    }
    return this.data;
  }
  filterShownTitles() {
    return _.filter(this.titles, t => !t['hidden'])
  }
  onChangeColumn(event): void {
    let newTitles = [];
    this.titles = _.map(this.titles, t => {
     if ( event.indexOf(t['key']) != -1 ) {
       _.set(t, 'hidden', false)
     } else {
       _.set(t, 'hidden', true)
     }
      return t
    })
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
}



