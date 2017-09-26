import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";

@Injectable()
export class AdvertisingService {

  mockData = [
    {
      "id": "1",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "banner",
      "showEnd": "PC端",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "启用中",
      "someStatus": "1"
    },
    {
      "id": "2",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "banner",
      "showEnd": "移动端",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "启用中",
      "someStatus": "1"
    },
    {
      "id": "3",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "分享邀请",
      "showEnd": "全平台",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "启用中",
      "someStatus": "1"
    },
    {
      "id": "4",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "小游戏",
      "showEnd": "全平台",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "已禁用",
      "someStatus": "2"
    },
    {
      "id": "5",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "平台实力",
      "showEnd": "全平台",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "已禁用",
      "someStatus": "2"
    },
    {
      "id": "6",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "推荐订阅",
      "showEnd": "移动端",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "已禁用",
      "someStatus": "2"
    },
    {
      "id": "7",
      "advertisingTitle": "xxxxxxx",
      "advertisingType": "banner",
      "showEnd": "全平台",
      "adLink": "https://www.baba88.com",
      "addDate": "2017-09-04 10:21:12",
      "state": "已禁用",
      "someStatus": "2"
    }
  ];

  constructor(private _httpInterceptorService: HttpInterceptorService) {
  }

  // 获取数据列表
  getList(params?): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}`, params);
    let res = {
      code: 0,
      msg: '',
      data: this.mockData,
      extras: {}
    };
    return Observable.of(res)
  }

  // 删除一条数据
  deleteOne(id): Observable<any> {
    // return this._httpInterceptorService.request('DELETE', `${baseUrl}/${apis['MEMBERS']}/${id}`)
    let data = _.remove(this.mockData, x => x.id === id);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    };
    return Observable.of(res);
  }

  // 获取一条数据
  getOne(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    };
    return Observable.of(res);

  }

  // 添加一条数据
  postOne(params): Observable<any> {
    // return this._httpInterceptorService.request('POST', `${baseUrl}/${apis['MEMBERS']}`, params)
    let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params);
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    };
    return Observable.of(res);
  }

  // 修改一条数据，提供所有字段
  putOne(id, params): Observable<any> {
    // return this._httpInterceptorService.request('PUT', `${baseUrl}/${apis['MEMBERS']}/${id}`, params)
    let index = _.findIndex(this.mockData, t => t.id === id);
    if (index != -1) {
      this.mockData[index] = params;
    }
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    };
    return Observable.of(res);
  }

}
