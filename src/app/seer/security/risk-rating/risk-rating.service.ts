import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {BaseService,HttpInterceptorService,API,ResModel,BASE_URL} from "../../../theme/services";
//let BASE_URL=`http://172.16.1.234:9080`;
@Injectable()
export class RiskRatingService extends BaseService<any> {

  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("riskRatings");
  }


  // 1 获取数据列表
  getLists(params: any): Promise<any> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/security/riskRatings`,params).toPromise();
    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}`,params).toPromise();

  }

  //2 获取一条数据
  getOne(id: string): Promise<any> {
    // return super.getOne(id);
    return this._httpInterceptorService.request('GET', `${BASE_URL}/security/riskRatings/${id}`).toPromise();
    //return this._httpInterceptorService.request('GET', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
  }

  // 3 添加一条数据
  postOne(params): Promise<any> {
    // return super.postOne(params);
    return this._httpInterceptorService.request('post', `${BASE_URL}/security/riskRatings`, params).toPromise();
    //return this._httpInterceptorService.request('post', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
  }

  // 4 修改一条数据
  putOne(params): Promise<any> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/security/riskRatings`, params).toPromise();
    //return this._httpInterceptorService.request('PUT', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
  }

  // 5 删除一条数据
  deleteOne(id): Promise<any> {
    // return super.deleteOne(id);
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/security/riskRatings/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
  }

}
