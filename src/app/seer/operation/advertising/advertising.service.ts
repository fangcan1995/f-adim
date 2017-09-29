import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";

@Injectable()
export class AdvertisingService {

  private advertisingManageUrl = 'http://172.16.1.25:8090/advertising';

  constructor(private _httpInterceptorService: HttpInterceptorService) {
  }

  // 获取数据列表
  getList(params?): Observable<any> {
    const page = `?pageNum=${params.pageNum}&pageSize=${params.pageSize}`;
    const sort = `&sortBy=${params.sort}`;
    return this._httpInterceptorService.request('GET', `${this.advertisingManageUrl}${page}${sort}`);
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
