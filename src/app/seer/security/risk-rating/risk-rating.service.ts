import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {
  HttpInterceptorService,
} from '../../../theme/services';
import {
  BASE_URL,
  API,
} from '../../../theme/services/base.service';
@Injectable()
export class RiskRatingService{
  //private riskRatingUrl = SERVER+'/sys/role';  // 接口，请修改
  listData=[
    {
      "id":"1","s2id_riskLevel":"1","s2id_riskLevelName":"保守型","scoreStart":"0","scoreEnd":"10","score":"0-10","investGrade1":"C", "investTotal":"100000.00",
      "remarks":""
    },
    {
      "id":"2","s2id_riskLevel":"2","s2id_riskLevelName":"稳健型","scoreStart":"11","scoreEnd":"30","score":"11-30","investGrade1":"B", "investTotal":"300000.00",
      "remarks":""
    },
    {
      "id":"3","s2id_riskLevel":"3","s2id_riskLevelName":"积极型","scoreStart":"31","scoreEnd":"100","score":"31-100","investGrade1":"A", "investTotal":"10000000.00",
      "remarks":""
    }
  ];  //假数据
  constructor(private _httpInterceptorService: HttpInterceptorService) {}
  // 获取数据列表
  getLists(): Observable<any> {
    let res = {
      code: 0,
      msg: '',
      data: this.listData,
      extras: {}
    }
    return Observable.of(res)
  }
  // 删除一条数据
  deleteOne(id): Observable<any> {
    // return this._httpInterceptorService.request('DELETE', `${baseUrl}/${apis['MEMBERS']}/${id}`)
    let data = _.remove(this.listData, x => x.id === id);
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
    let data = _.find(this.listData, x => x.id === id);
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
    let id = _.reduce(this.listData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.listData.push(params)
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
    let index = _.findIndex(this.listData, t => t.id === id);
    if ( index != -1 ) {
      this.listData[index] = params;
    }
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }

}
