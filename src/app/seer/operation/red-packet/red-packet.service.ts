import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import * as _ from "lodash";

@Injectable()
export class RedPacketService {

  mockData = [
    {
      "id": "1",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送失败",
      "someStatus": "1"
    },
    {
      "id": "2",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送失败",
      "someStatus": "1"
    },
    {
      "id": "3",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送成功",
      "someStatus": "2"
    },
    {
      "id": "4",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送成功",
      "someStatus": "2"
    },
    {
      "id": "5",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送成功",
      "someStatus": "2"
    },
    {
      "id": "6",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送成功",
      "someStatus": "2"
    },
    {
      "id": "7",
      "redPacketTheme": "xxxxxxx",
      "activityTheme": "xxxxx",
      "redPacketRates": "1000.00",
      "startSum": "2000.00",
      "issueDate": "2017.6.9",
      "expirationDate": "2017.6.9",
      "state": "发送成功",
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
  getDatas(): Promise<any> {
      return new Promise((resolve, reject) => {
        resolve(
          {
            'success': true,
            'data':[
              {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"01"},
              {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"02"},
              {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"03"},
              {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"04"}, 
            ]
          } 
        )
      })
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
