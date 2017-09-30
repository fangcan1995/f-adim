import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";

@Injectable()
export class AdvertisingService {
  temp_date=[
    {"id":"1","title":"aaa","adType":"banner","putEnv":"PC端","imgLink":"<img src='https://www.baba88.com/admin/userfiles/1/images/loan/logo/2017/06/1498821994576.gif' width='120' height='40'>","url":"<a href='https://www.baba88.com'>https://www.baba88.com</a>","createTime":"2017-09-04 10:21:12"},
    {"id":"2","title":"bbb","adType":"分享邀请","putEnv":"移动端","url":""},
    {"id":"3","title":"bbb","adType":"平台实力","putEnv":"全平台","url":""},
  ];
  private advertisingManageUrl = 'http://172.16.1.25:8090/advertising';

  constructor(private _httpInterceptorService: HttpInterceptorService) {
  }

  // 获取数据列表
  getList(params?): Observable<any> {
    const page = `?pageNum=${params.pageNum}&pageSize=${params.pageSize}`;
    const sort = `&sortBy=${params.sort}`;
    //return this._httpInterceptorService.request('GET', `${this.advertisingManageUrl}${page}${sort}`);

    let res = {
      code: 0,
      msg: '',
      data: this.temp_date,
      extras: {}
    }
    return Observable.of(res);
  }

  // 删除一条数据
  deleteOne(id): Observable<any> {
    return this._httpInterceptorService.request('DELETE', `${this.advertisingManageUrl}/${id}`)
  }

  // 获取一条数据
  getOne(id): Observable<any> {
    return this._httpInterceptorService.request('GET', `${this.advertisingManageUrl}/${id}`);
  }

  // 添加一条数据
  postOne(params): Observable<any> {
    return this._httpInterceptorService.request('POST', `${this.advertisingManageUrl}`, params)
  }

  // 修改一条数据，提供所有字段
  putOne(id, params): Observable<any> {
    return this._httpInterceptorService.request('PUT', `${this.advertisingManageUrl}/${id}`, params)
  }

}
