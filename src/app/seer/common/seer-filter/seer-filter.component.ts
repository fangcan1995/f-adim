import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import * as _ from 'lodash';

import { Animations } from '../../../theme/animations/animations';
export interface FilterModel {
  key: string | number,
  label: string,
  value: string | number,
  type?: string,
  options?: Array<any>,
}

@Component({
  selector: 'seer-filter',
  templateUrl: 'seer-filter.component.html',
  styleUrls: [ 'seer-filter.component.scss' ],
  animations: [ Animations.slideInOut ]
})
export class SeerFilterComponent implements OnInit {
  @Input() hasGlobalFilter;
  @Input() globalFilterValue: string;
  @Input() filters: Array<FilterModel>;
  @Output() onInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter<any>();
  public isFiltersShown = false;

  constructor() { }
  ngOnInit() {
    this.onInit.emit({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    });
  }
  handleGlobalFilterInputChange() {
    this.onFiltersChanged.emit({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    });
  }
  handleComplexBtnClick() {
    this.isFiltersShown = !this.isFiltersShown
  }
  isFilterShown() {
    return this.isFiltersShown.toString()
  }
  handleFilterChange() {
    this.onFiltersChanged.emit({
      ...this.getFilterParams(this.filters),
      global: this.globalFilterValue
    });
  }

  getFilterParams(filters: Array<FilterModel>) {
    let filterParams = {};
    _(filters).each(x => {
      filterParams[x.key] = x.value;
    })
    return filterParams;
  }
}