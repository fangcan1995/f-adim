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
import { ManageService } from "../../../theme/services";

export interface FilterModel {
  key: string | number,
  label: string,
  value: string | number,
  type?: string,
  options?: Array<any>,
  isDict?: boolean,
  category?: string | number,
  dateFormatingRules?: string,
  disabled?: boolean,
  groups?: Array<any>,
}

@Component({
  selector: 'seer-filter',
  templateUrl: './seer-filter.component.html',
  styleUrls: [ './seer-filter.component.scss' ],
  animations: [ Animations.slideInOut ],
  providers: [ManageService]
})
export class SeerFilterComponent implements OnInit {
  @Input() hasGlobalFilter: boolean; // 是否有全局搜索输入框
  @Input() globalFilterValue: string;
  @Input() filters: Array<FilterModel>;
  @Input() translate;
  @Input() formGroupColNum:string='col-sm-12 col-md-6 col-lg-6 col-lg-4' //查询向一行显示的列数，edit by lily

  @Output() onInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchBtnClicked: EventEmitter<any> = new EventEmitter<any>();
  private isFiltersShown: boolean = false;

  filters$ = new Subject();
  @ViewChild('searchBtn') searchBtn;
  constructor(
    private service: ManageService,
  ) { }
  ngOnInit() {
    this.onInit.emit({
      ...this.getFilterParams(this.filters),
      globalSearch: this.globalFilterValue
    });

    /** 增加的部分 */
    if ( !this.translate ) {
      let transFields = [];
      _.each(this.filters, filter => {
        if ( filter.isDict ) {
          transFields.push({
            fieldName: filter.key,
            category: filter.category,
          });
        }
      });
      this.service.getDictTranslate(transFields)
      .then(res => {
        if ( res.code == 0 ) this.translate = res.data;
        _.each(this.filters, filter => {
          if ( filter.isDict && this.translate && _.isArray(this.translate[filter.key]) ) {
            filter.options = [
              {
                content: '请选择',
              },
              ..._.map(this.translate[filter.key], x => {
                return {
                  value: x['itemId'],
                  content: x['itemName'],
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
                value: x['itemId'],
                content: x['itemName'],
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
          globalSearch: this.globalFilterValue
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
        globalSearch: this.globalFilterValue
      })
    })
  }
  /*edit by lily 修复了不响应group里控件有值时查询按钮不激活的情况
  * */
  renderSearchBtn() {
    let forbidSearchBtn = true;
    _.each(this.filters, x => {
      if ( !(typeof x.value === 'undefined' || x.value === null || trim(x.value.toString(), false) === '') ) {
        return forbidSearchBtn = false;
      } else if ( x.groups ) {
        /*edit by lily*/
        _.each(x.groups,y=>{
          if ( !(typeof y.value === 'undefined' || y.value === null || trim(y.value.toString(), false) === '') ) {
            return forbidSearchBtn = false;
          }
        })
        /*end*/
      }
    })
    return forbidSearchBtn;
  }
  handleGlobalFilterInputChange() {
    this.filters$.next({
      ...this.getFilterParams(this.filters),
      globalSearch: this.globalFilterValue
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
      globalSearch: this.globalFilterValue
    })
  }
  handleResetBtnClick() {
    _.each(this.filters, x => {
      if ( _.isArray(x.groups) ) {
        _.each(x.groups, y => {
          y.value = undefined;
        })
      } else {
        x.value = undefined;
      }
    })
    this.filters$.next({
      ...this.getFilterParams(this.filters),
      globalSearch: this.globalFilterValue
    })
  }

  getFilterParams(filters: Array<FilterModel>) {
    let filterParams = {};
    _.each(filters, x => {
      if ( _.isArray(x.groups) ) {
        filterParams[x.key] = _.map(x.groups, y => y.value);
      } else {
        filterParams[x.key] = x.value;
      }
    })
    return filterParams;
  }
  getGroupCol(groupsLength, groupSpacesLength) {
    return Math.floor((12 - groupSpacesLength * 2) / groupsLength);
  }

}
