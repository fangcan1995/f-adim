import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
@Injectable()
export class AdvertisingService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService,private http: Http) {
    super(_httpInterceptorService);

  }

  url=`http://172.16.1.221:9080/advertisings`  //临时
  accessToken=`7fbb40a8-64a1-4a44-94ae-4eee6f3d4625`;
  // 1 获取数据列表
  getList(params?):Promise<ResModel> {

    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}`,params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/advertisings`,params).toPromise();
  }

  //2 获取一条数据
  getOne(id):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${this.url}/${id}?access_token=${this.accessToken}`,{}, true).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/advertisings/${id}`,{}, true).toPromise();
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
  //7导出 excel
   /*exportPersonalForm(params): Promise<any> {
    let url='http://172.16.1.221:9080/advertisings?access_token=67a910de-54e6-497a-b05c-c4b328924b1e'  //临时
    return this.http.get(`${url}`, new RequestOptions({
      responseType: ResponseContentType.Blob,
      search: params
    })).toPromise();
  }*/

}
