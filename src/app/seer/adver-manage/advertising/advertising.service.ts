import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel} from "../../../theme/services"
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import {getStorage} from "../../../theme/libs/utils";
let BASE_URL=`http://172.16.1.221:9080`;

@Injectable()
export class AdvertisingService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    //this.setApi("MESSAGES");
  }
  // 1 获取数据列表
  getList(params?):Promise<ResModel> {

    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}`,params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/advertisings`,params).toPromise();
  }

  //2 获取一条数据
  getOne(id):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${this.url}/${id}?access_token=${this.accessToken}`,{}, true).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/advertisings/${id}`,{}).toPromise();
  }
  // 3添加一条数据
  postOne(params):Promise<ResModel> {
    let fileId=params.fileId;
    //return this._httpInterceptorService.request('POST', `${this.url}?access_token=${this.accessToken}`,params ).toPromise();
    return this._httpInterceptorService.request('POST', `${BASE_URL}/advertisings`,params ).toPromise();
    //return this._httpInterceptorService.request('POST', `${BASE_URL}/advertisings/${fileId}`, params).toPromise();
  }

  // 4 修改一条数据，提供所有字段
  putOne(id, params):Promise<any> {
    //return this._httpInterceptorService.request('PUT', `${this.url}/?access_token=${this.accessToken}`, params).toPromise();
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/advertisings`, params).toPromise();
  }

// 5 删除一条数据
  deleteOne(id):Promise<any> {
    //return this._httpInterceptorService.request('DELETE', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/advertisings/${id}`).toPromise();
  }

  //6 修改状态
  /*patchOne(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
    //return this._httpInterceptorService.request('PATCH', `${BASE_URL}/advertisings`, params).toPromise();
  }*/
  //7 导出表格
  exportForm(params): Promise<any> {
    const access_token = getStorage({ key: 'token' }).access_token;
    return this.http.get(`${BASE_URL}/advertisings/specialExport?access_token=${access_token}`, new RequestOptions({
      responseType: ResponseContentType.Blob,
      search: params
    })).toPromise();
  }

}
