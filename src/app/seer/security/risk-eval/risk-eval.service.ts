import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel} from "../../../theme/services"
import {Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
import * as _ from 'lodash';
import {getStorage} from "../../../theme/libs/utils";

let BASE_URL=`http://172.16.1.234:9080`;

@Injectable()
export class RiskEvalService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("riskEvals");
  }

  //1 获取数据列表
  getLists(params?): Promise<any> {
    return this._httpInterceptorService.request("GET", `${BASE_URL}/security/riskEvals`,params).toPromise();
  }

  //2 获取一条数据
  getOne(id: string): Promise<any> {
    // return super.getOne(id);
    //return this._httpInterceptorService.request('GET', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/security/riskEvals/${id}`).toPromise();
  }

  // 3 添加一条题目
  postOne(params): Promise<any> {
    // return super.postOne(params);
    return this._httpInterceptorService.request('post', `${BASE_URL}/security/riskEvals`, params).toPromise();
    //return this._httpInterceptorService.request('post', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
  }

  // 4 修改一条数据
  putOne(params): Promise<any> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/security/riskEvals`, params).toPromise();
    //return this._httpInterceptorService.request('PUT', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
  }

  // 5 删除一条数据
  deleteOne(id): Promise<any> {
    // return super.deleteOne(id);
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/security/riskEvals/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
  }

}
