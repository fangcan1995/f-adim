import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {HttpInterceptorService} from '../../../theme/services';
import {BaseService} from '../../../theme/services/base.service';

@Injectable()
export class PersonalInfoService extends BaseService<any> {

  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("personalInfo");
  }

  private personalInfoAPI = "http://172.16.1.27:8090/personalInfo";
  // private personalInfoAPI = "http://172.16.7.4:8090/personalInfo";

  //1 获取数据列表
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
    const url = `${this.personalInfoAPI}${page}${sort}${query}`;
    return this._httpInterceptorService.request("GET", `${url}`).toPromise();
  }

  //2 获取一条数据
  getOne(id: string): Promise<any> {
    // return super.getOne(id);
    return this._httpInterceptorService.request('GET', `${this.personalInfoAPI}/${id}`).toPromise();
  }

  // 3 添加一条题目
  postOne(params): Promise<any> {
    return super.postOne(params);
  }

  // 4 修改一条数据
  putOne(params): Promise<any> {
    return this._httpInterceptorService.request('PUT', `${this.personalInfoAPI}`, params).toPromise();
  }

  // 5 删除一条数据
  deleteOne(id): Promise<any> {
    return super.deleteOne(id);
  }

}
