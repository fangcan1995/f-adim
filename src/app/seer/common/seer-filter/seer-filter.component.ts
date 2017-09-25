import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import { trim } from '../../../theme/libs/utils'
import { Animations } from '../../../theme/animations/animations';
import { BaseService } from "../../base.service";

import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { de } from 'ngx-bootstrap/locale';

export interface FilterModel {
  key: string | number,
  label: string,
  value: string | number,
  type?: string,
  options?: Array<any>,
  isDict?: boolean,
  dictKeyId?: string | number,
}

@Component({
  selector: 'seer-filter',
  templateUrl: 'seer-filter.component.html',
  styleUrls: [ 'seer-filter.component.scss' ],
  animations: [ Animations.slideInOut ],
  providers: [BaseService]
})
export class SeerFilterComponent implements OnInit {
  @Input() hasGlobalFilter: boolean; // 是否有全局搜索输入框
  @Input() globalFilterValue: string; 
  @Input() filters: Array<FilterModel>;
  @Input() translate;
  
  @Output() onInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchBtnClicked: EventEmitter<any> = new EventEmitter<any>();
  private isFiltersShown: boolean = false;
  filters$ = new Subject();
  @ViewChild('searchBtn') searchBtn;

  constructor(
    private service: BaseService<any>,
  ) { }
  ngOnInit() {
    this.onInit.emit({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    });

    /** 增加的部分 */
    if ( !this.translate ) {
      let transFields = [];
      _.each(this.filters, filter => {
        if ( filter.isDict ) {
          transFields.push({
            field: filter.key,
            dictKeyId: filter.dictKeyId,
          });
        }
      });
      this.service.getDictTranslate(transFields)
      .then(res => {
        if ( res.success ) this.translate = res.data;
        console.log(this.translate)
        _.each(this.filters, filter => {
          if ( filter.isDict && this.translate && _.isArray(this.translate[filter.key]) ) {
            filter.options = [
              {
                content: '请选择',
              },
              ..._.map(this.translate[filter.key], x => {
                return {
                  value: x['dictValueId'],
                  content: x['dictValueName'],
                }
              })
            ]
          }
        });
      });
    } else {
      _.each(this.filters, filter => {
        if ( filter.isDict && this.translate && _.isArray(this.translate[filter.key]) ) {
          filter.options = [
            {
              content: '请选择',
            },
            ..._.map(this.translate[filter.key], x => {
              return {
                value: x['dictValueId'],
                content: x['dictValueName'],
              }
            })
          ]
        }
      });
    }
    
  }

  ngAfterViewInit() {
    if ( this.searchBtn ) {
      Observable.fromEvent(this.searchBtn.nativeElement, 'click')
      .debounceTime(300)
      .subscribe(res => {
        this.onSearchBtnClicked.emit({
          ...this.getFilterParams(this.filters),
          global: this.globalFilterValue
        })
      })
    }

    this.filters$
    .map(filters => JSON.stringify(filters))
    .debounceTime(300)
    // .distinctUntilChanged() 不检查是否变更
    .subscribe(filters => {
      this.onFiltersChanged.emit({
        ...this.getFilterParams(this.filters),
        global: this.globalFilterValue
      })
    })
  }
  renderSearchBtn() {
    let forbidSearchBtn = true;
    _.each(this.filters, x => {
      if ( !(typeof x.value === 'undefined' || x.value === null || trim(x.value.toString(), false) === '') ) {
        return forbidSearchBtn = false;
      }
    })
    return forbidSearchBtn;
  }
  handleGlobalFilterInputChange() {
    this.filters$.next({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    })

  }
  handleComplexBtnClick() {
    this.isFiltersShown = !this.isFiltersShown
  }
  isFilterShown() {
    return this.isFiltersShown.toString()
  }
  handleFilterChange() {
    this.filters$.next({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    })
    console.log(this.filters)
  }
  handleResetBtnClick() {
    _.each(this.filters, x => {
      x.value = undefined;
    })
    this.filters$.next({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    })
  }

  getFilterParams(filters: Array<FilterModel>) {
    let filterParams = {};
    _.each(filters, x => {
      filterParams[x.key] = x.value;
    })
    return filterParams;
  }

}