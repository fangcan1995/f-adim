import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { cityJson } from '../../../theme/libs/cityJson';
import * as _ from 'lodash';

export class AddressModel {
  constructor(
    item_code?: string,
    item_name?: string,
    ) {}
}

export interface AddressPickerOptionsModel {
  
}

@Component({
  selector: 'seer-address-picker',
  template: `
    <div class="row">
      <div class="form-group col-xs-12 col-md-4 col-lg-2">
        <select class="form-control" (change)="handleProvinceChange($event)">
          <option *ngFor="let p of getProvinces()" value="{{ p['item_code'] }}">{{ p.item_name }}</option>
        </select>
      </div>
      <div class="form-group col-xs-12 col-md-4 col-lg-2">
          <select class="form-control" (change)="handleCityChange($event)">
            <option *ngFor="let c of getCitys()" value="{{ c['item_code'] }}">{{ c.item_name }}</option>
          </select>
      </div>
      <div class="form-group col-xs-12 col-md-4 col-lg-2">
          <select class="form-control" (change)="handleDistrictChange($event)">
            <option *ngFor="let d of getDistricts()" value="{{ d['item_code'] }}">{{ d.item_name }}</option>
          </select>
      </div>
      <div class="form-group col-xs-12 col-md-12 col-lg-6">
        <input class="form-control" placeholder="详细地址" type="text" [(ngModel)]="address" (keyup)="handleAddressChange()">
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class SeerAddressPickerComponent implements OnInit {
  defaultProvince: AddressModel = {
    item_code: null,
    item_name: '请选择省份',
  }

  defaultCity: AddressModel = {
    item_code: null,
    item_name: '请选择城市',
  }

  defaultDistrict: AddressModel = {
    item_code: null,
    item_name: '请选择区/县',
  }

  curProvince: AddressModel = {};
  curCity: AddressModel = {};
  curDistrict: AddressModel = {};
  address: string = '';
  cityJson: AddressModel[] = _.cloneDeep(cityJson);
  cityMap = new Map;
  @Input() options: AddressPickerOptionsModel;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  constructor() {
    _.each(this.cityJson, t => {
      this.cityMap.set(t['item_code'], t['item_name']);
    })
  }
  provinceRegExp = /^[1-9][0-9]0000$/;
  cityRegExp = /^([1-9][0-9]|[0-9][1-9]){2}00$/;
  districtRegExp = /^([1-9][0-9]|[0-9][1-9]){3}$/;
  testProvinceByCode(code): boolean {
    return this.provinceRegExp.test(code);
  }
  testCityByCode(code): boolean {
    return this.cityRegExp.test(code);
  }
  testDistrictByCode(code): boolean {
    return this.districtRegExp.test(code);
  }
  ngOnInit() {
    this.curProvince = this.getProvinces()[0];
    this.curCity = this.getCitys()[0];
    this.curDistrict = this.getDistricts()[0];
  }
  private getProvinces() {
    let list = [];
    list.push(this.defaultProvince);
    let provinces = _(this.cityJson)
    .filter(t => this.testProvinceByCode(t['item_code']))
    .value();
    list = list.concat(provinces)
    return list;
  }
  private getCitys() {
    let list = [];
    list.push(this.defaultCity)
    if ( this.curProvince['item_code'] ) {
      let citys = _(this.cityJson)
      .filter(t => this.testCityByCode(t['item_code']))
      .filter(t => t['item_code'].substr(0, 2) === this.curProvince['item_code'].substr(0, 2))
      .value();
      list = list.concat(citys)
      
    }

    return list;
  }
  private getDistricts() {
    let list = [];
    list.push(this.defaultDistrict)
    if ( this.curCity['item_code'] ) {
      let citys = _(this.cityJson)
      .filter(t => this.testDistrictByCode(t['item_code']))
      .filter(t => t['item_code'].substr(0, 4) === this.curCity['item_code'].substr(0, 4))
      .value();
      list = list.concat(citys)
      
    }
    return list;
  }
  notifyChange() {
    this.notify.emit({
      province: this.curProvince['item_code'] ? this.curProvince['item_name'] : null,
      city: this.curCity['item_code'] ? this.curCity['item_name'] : null,
      district: this.curDistrict['item_code'] ? this.curDistrict['item_name'] : null,
      address: this.address,
    })
  }
  handleProvinceChange($event) {
    this.curProvince = {
      item_code: $event.target.value,
      item_name: this.cityMap.get($event.target.value),
    }
    this.curCity = this.getCitys()[0];
    this.curDistrict = this.getDistricts()[0];
    this.notifyChange();
  }

  handleCityChange($event) {
    this.curCity = {
      item_code: $event.target.value,
      item_name: this.cityMap.get($event.target.value),
    }

    this.curDistrict = this.getDistricts()[0];
    this.notifyChange();
  }

  handleDistrictChange($event) {
    this.curDistrict = {
      item_code: $event.target.value,
      item_name: this.cityMap.get($event.target.value),
    }
    this.notifyChange();
  }
  handleAddressChange() {
    this.notifyChange();
  }
}
