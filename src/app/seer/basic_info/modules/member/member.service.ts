import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {
  baseUrl,
  apis,
  HttpInterceptorService,
} from '../../../../theme/services';
@Injectable()
export class MemberService {
  mockData = [{"id":"1","name":"本拉登","real_name":"本·拉登","gender":"0","age":"52","marriage":"0","id_number":"123456","mobile":"13912342234","census_register":"阿富汗赫拉特","residence":"阿富汗坎大哈","annual_income":"1,000,000","asset_introduction":"负债1,000,000"},{"id":"2","name":"用户名2","real_name":"真实姓名2","gender":"1","age":"18","marriage":"0","id_number":"123456","mobile":"13912342234"},{"id":"3","name":"用户名3","real_name":"真实姓名3","gender":"0","age":"32","marriage":"0","id_number":"123456","mobile":"13912342234"},{"id":"4","name":"用户名4","real_name":"真实姓名4","gender":"1","age":"18","marriage":"0","id_number":"123456","mobile":"13912342234"},{"id":"5","name":"用户名55","real_name":"真实姓名5","gender":"0","age":"18","marriage":"0","id_number":"123456","mobile":"13912342234"},{"id":"6","name":"用户名6333","real_name":"真实姓名6","gender":"0","age":"18","marriage":"0","id_number":"123456","mobile":"13912342234"},{"id":"7","name":"用户名7","real_name":"真实姓名7","gender":"0","age":"18","marriage":"0","id_number":"123456","mobile":"13912342234"},{"id":"8","name":"用户名8","real_name":"真实姓名8","gender":0,"age":"18","marriage":0,"id_number":"123456","mobile":"13912342234"},{"name":"第九名","id":"81","gender":"0","real_name":"第九名"},{"name":"10号选手","real_name":"流翔","id":"811"}]
  constructor(private _httpInterceptorService: HttpInterceptorService) {}
  // 获取数据列表
  getList(params?): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}`, params);
    let res = {
      code: 0,
      msg: '',
      data: this.mockData,
      extras: {}
    }
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
    }
    return Observable.of(res);
  }
  // 获取一条数据
  getOne(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data)
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }
    return Observable.of(res);
    
  }
  // 添加一条数据
  postOne(params): Observable<any> {
    // return this._httpInterceptorService.request('POST', `${baseUrl}/${apis['MEMBERS']}`, params)
    let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params)
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }
  // 修改一条数据，提供所有字段
  putOne(id, params): Observable<any> {
    // return this._httpInterceptorService.request('PUT', `${baseUrl}/${apis['MEMBERS']}/${id}`, params)
    let index = _.findIndex(this.mockData, t => t.id === id);
    if ( index != -1 ) {
      this.mockData[index] = params;
    }
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }
  // 修改一条数据，提供部分字段
 /* patchOne(id, params): Observable<any> {
    // return this._httpInterceptorService.request('PATCH', `${baseUrl}/${apis['MEMBERS']}/${id}`, params)
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }
    return Observable.of(res);
  }*/
}