import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { cityJson, overlayOpt } from '../../../theme/libs';
import * as _ from 'lodash';

export class AddressModel {
  public item_code?: string;
  public item_name?: string;
}


export interface AddressPickerClassNamesModel {
  containerClass?: string,
  provinceContainerClass?: string,
  provinceClass?: string,
  cityContainerClass?: string,
  cityClass?: string,
  districtContainerClass?: string,
  districtClass?: string,
  addressContainerClass?: string,
  addressClass?: string,
}

@Component({
  selector: 'seer-address-picker',
  template: `
    <div class="{{ classNames.containerClass }}">
      <div class="{{ classNames.provinceContainerClass }}">
        <select class="{{ classNames.provinceClass }}" [value]="curProvince.item_code" (change)="handleProvinceChange($event)" [disabled]="disabled">
          <option *ngFor="let p of getProvinces()" value="{{ p['item_code'] }}">{{ p.item_name }}</option>
        </select>
      </div>
      <div class="{{ classNames.cityContainerClass }}">
          <select class="{{ classNames.cityClass }}" [value]="curCity.item_code" (change)="handleCityChange($event)" [disabled]="disabled">
            <option *ngFor="let c of getCitys()" value="{{ c['item_code'] }}">{{ c.item_name }}</option>
          </select>
      </div>
      <div class="{{ classNames.districtContainerClass }}">
          <select class="{{ classNames.districtClass }}" [value]="curDistrict.item_code" (change)="handleDistrictChange($event)" [disabled]="disabled">
            <option *ngFor="let d of getDistricts()" value="{{ d['item_code'] }}">{{ d.item_name }}</option>
          </select>
      </div>
      <div class="{{ classNames.addressContainerClass }}">
        <input class="{{ classNames.addressClass }}" placeholder="详细地址" type="text" [(ngModel)]="address" (keyup)="handleAddressChange()" [disabled]="disabled">
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class SeerAddressPickerComponent implements OnInit, OnChanges {
  defaultProvince: AddressModel = {
    item_code: '0',
    item_name: '请选择省份',
  }

  defaultCity: AddressModel = {
    item_code: '0',
    item_name: '请选择城市',
  }

  defaultDistrict: AddressModel = {
    item_code: '0',
    item_name: '请选择区/县',
  }

  curProvince: AddressModel = {};
  curCity: AddressModel = {};
  curDistrict: AddressModel = {};
  address: string = '';
  cityJson: AddressModel[] = _.cloneDeep(cityJson);
  cityMap = new Map;
  @Input() defaultItemCode: string;
  @Input() defaultAddress: string;
  @Input() classNames: AddressPickerClassNamesModel = {};
  @Input() disabled: boolean;
  public _defaultClassNames: AddressPickerClassNamesModel = {
    containerClass: 'row',
    provinceContainerClass: 'form-group col-xs-12 col-md-4 col-lg-2',
    provinceClass: 'form-control',
    cityContainerClass: 'form-group col-xs-12 col-md-4 col-lg-2',
    cityClass: 'form-control',
    districtContainerClass: 'form-group col-xs-12 col-md-4 col-lg-2',
    districtClass: 'form-control',
    addressContainerClass: 'form-group col-xs-12 col-md-12 col-lg-6',
    addressClass: 'form-control',
  }

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
    this.classNames = overlayOpt(this.classNames, this._defaultClassNames);

    this.curProvince = this.getCurProvince(this.getProvinces(), this.defaultItemCode);
    this.curCity = this.getCurCity(this.getCitys(), this.defaultItemCode);
    this.curDistrict = this.getCurDistrict(this.getDistricts(), this.defaultItemCode);
    this.address = this.defaultAddress;
  }
  ngOnChanges() {
    this.classNames = overlayOpt(this.classNames, this._defaultClassNames);

    this.curProvince = this.getCurProvince(this.getProvinces(), this.defaultItemCode);
    this.curCity = this.getCurCity(this.getCitys(), this.defaultItemCode);
    this.curDistrict = this.getCurDistrict(this.getDistricts(), this.defaultItemCode);
    this.address = this.defaultAddress;
  }
  public getCurProvince(provinces, itemCode?) {
    let curProvince;
    if ( !itemCode ) {
      curProvince = provinces[0];
    } else {
      curProvince = _.find(_.slice(provinces, 1, provinces.length), t => t['item_code'].substr(0, 2) === itemCode.substr(0, 2)) || provinces[0]
    }
    return curProvince;
  }

  public getCurCity(citys, itemCode?) {
    let curCity;
    if ( !itemCode ) {
      curCity = citys[0];
    } else {
      curCity = _.find(_.slice(citys, 1, citys.length), t => t['item_code'].substr(2, 2) === itemCode.substr(2, 2)) || citys[0]
    }
    return curCity;
  }
  public getCurDistrict(districts, itemCode?) {
    let curDistrict;
    if ( !itemCode ) {
      curDistrict = districts[0];
    } else {
      curDistrict = _.find(_.slice(districts, 1, districts.length), t => t['item_code'].substr(4, 2) === itemCode.substr(4, 2)) || districts[0]
    }
    return curDistrict;
  }
  public getProvinces() {
    let list = [];
    list.push(this.defaultProvince);
    let provinces = _(this.cityJson)
    .filter(t => this.testProvinceByCode(t['item_code']))
    .value();
    list = list.concat(provinces)
    return list;
  }
  public getCitys() {
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
  public getDistricts() {
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
      province: this.curProvince,
      city: this.curCity,
      district: this.curDistrict,
      address: this.address,
    })
  }
  handleProvinceChange($event) {
    this.curProvince = {
      item_code: $event.target.value,
      item_name: this.cityMap.get($event.target.value),
    }
    this.curCity = this.getCurCity(this.getCitys());
    this.curDistrict = this.getCurDistrict(this.getDistricts());
    this.notifyChange();
  }

  handleCityChange($event) {
    this.curCity = {
      item_code: $event.target.value,
      item_name: this.cityMap.get($event.target.value),
    }

    this.curDistrict = this.getCurDistrict(this.getDistricts());
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
