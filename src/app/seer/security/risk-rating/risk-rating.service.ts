import { Injectable } from "@angular/core";
import {HttpInterceptorService} from '../../../theme/services';
import {BaseService} from "../../../theme/services/base.service";
import {Http} from "@angular/http";

@Injectable()
export class RiskRatingService extends BaseService<any> {

  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("riskRatings");
  }

  private riskRatingsAPI = "http://172.16.7.4:8070/riskRatings";

  // 1 获取数据列表
  getLists(pageInfo: any): Promise<any> {
    const page = `?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort = `&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query: string = "";
    for (var prop in jsonQueryObj) {
      if (jsonQueryObj[prop]) {
        query += `&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.riskRatingsAPI}${page}${sort}${query}`;
    return this._httpInterceptorService.request("GET", `${url}`).toPromise();
  }

  //2 获取一条数据
  getOne(id: string): Promise<any> {
    // return super.getOne(id);
    return this._httpInterceptorService.request('GET', `${this.riskRatingsAPI}/${id}`).toPromise();
  }

  // 3 添加一条数据
  postOne(params): Promise<any> {
    // return super.postOne(params);
    return this._httpInterceptorService.request('post', `${this.riskRatingsAPI}`, params).toPromise();
  }

  // 4 修改一条数据
  putOne(params): Promise<any> {
    return this._httpInterceptorService.request('PUT', `${this.riskRatingsAPI}`, params).toPromise();
  }

  // 5 删除一条数据
  deleteOne(id): Promise<any> {
    // return super.deleteOne(id);
    return this._httpInterceptorService.request('DELETE', `${this.riskRatingsAPI}/${id}`).toPromise();
  }

}
