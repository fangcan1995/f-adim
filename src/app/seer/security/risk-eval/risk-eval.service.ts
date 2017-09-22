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
export class RiskEvalService {
  //private riskEvalUrl = SERVER+'/sys/role';  // 接口，请修改
  listData=[
    {
      "id": "1",
      "examName": "当您进行投资时，能接受的亏损程度是多少？",
      "examType": "0",
      "updateDate": "2017-01-05 13:23:48",
      answers: [
        {"id": "1", "title": "无法承受风险", "score": "1"},
        {"id": "2", "title": "虽然厌恶风险但愿意承担一些风险", "score": "2"},
        {"id": "3", "title": "在深思熟虑后愿意承担一定的风险", "score": "3"},
        {"id": "4", "title": "敢冒风险，比较激进", "score": "4"},
      ]
    },
    {

        "id": "2",
        "examName": "在一般情況下，在您的家庭收入中，有百分之几可用作投资或储蓄？",
        "examType": "1",
        "updateDate": "2017-01-05 13:23:48",
      answers: [
        {"id": "1", "title": "无法承受风险", "score": "1"},
        {"id": "2", "title": "虽然厌恶风险但愿意承担一些风险", "score": "2"},
        {"id": "3", "title": "在深思熟虑后愿意承担一定的风险", "score": "3"},
        {"id": "4", "title": "敢冒风险，比较激进", "score": "4"},
      ]
    },
    {
        "id": "3",
        "examName": "您对风险的承受程度是？",
        "examType": "1",
        "updateDate": "2017-01-05 13:23:48",
      answers: [
        {"id": "1", "title": "无法承受风险", "score": "1"},
        {"id": "2", "title": "虽然厌恶风险但愿意承担一些风险", "score": "2"},
        {"id": "3", "title": "在深思熟虑后愿意承担一定的风险", "score": "3"},
        {"id": "4", "title": "敢冒风险，比较激进", "score": "4"},
      ]
    }
  ];  //假数据
  constructor(private _httpInterceptorService: HttpInterceptorService) {}
  // 获取数据列表
  getRiskEvals(): Observable<any> {
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
    // return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['MEMBERS']}/${id}`)
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
    // return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MEMBERS']}/${id}`);
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
    // return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['MEMBERS']}`, params)
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
    // return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['MEMBERS']}/${id}`, params)
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
