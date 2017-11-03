import {Injectable} from "@angular/core";
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
} from "../../../theme/services";
import {Observable} from "rxjs/Observable";
import {getStorage} from "../../../theme/libs/utils"

import * as _ from 'lodash';

@Injectable()
export class AnnouncementService extends BaseService<any>{

  apiUrl = 'http://172.16.4.62:8070/announcements';
  accessToken = getStorage({ key: 'token' }).access_token;






  // 获取数据列表
  /*getList(params?): Promise<any> {
    const url = `${this.apiUrl}`;
    return this.getAll(url);
  }
*/
  getList(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', 'http://172.16.4.62:8070/announcements', params).toPromise();
  }

  // 删除一条数据
  /*deleteOne (id): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.delete(url);
  }*/
  deleteOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `http://172.16.4.62:8070/announcements/${id}`).toPromise();
  }

  // 获取一条数据
  /*getOne (id): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.getById(url);
  }*/
  getOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `http://172.16.4.62:8070/announcements/${id}`).toPromise();
  }

  // 添加一条数据
 /* postOne(params): Promise<any> {
    const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.create(url,params);
  }*/

  // 修改一条数据，提供所有字段
  /*putOne(params): Promise<any> {
    const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.update(url, params);
  }*/

  putOne(params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `http://172.16.4.62:8070/announcements`, params).toPromise();
  }

}
