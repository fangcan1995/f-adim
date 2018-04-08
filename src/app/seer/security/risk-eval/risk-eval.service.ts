import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services";

@Injectable()
export class RiskEvalService extends BaseService<any> {

  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("riskEvals");
  }

  //private riskEvalsAPI = "http://172.16.7.4:8070/riskEvals";
  private url =`http://172.16.1.221:9080/security/riskEvals`  //临时
  accessToken=`7fbb40a8-64a1-4a44-94ae-4eee6f3d4625`;
  //1 获取数据列表
  getLists(params: any): Promise<any> {
    /*const page = `&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort = `&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query: string = "";
    for (var prop in jsonQueryObj) {
      if (jsonQueryObj[prop]) {
        query += `&${prop}=${jsonQueryObj[prop]}`;
      }
    }*/
    //const url = `${this.riskEvalsAPI}${page}${sort}${query}`;
    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}`,params).toPromise();
    return this._httpInterceptorService.request("GET", `${BASE_URL}/security/riskEvals`).toPromise();
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
