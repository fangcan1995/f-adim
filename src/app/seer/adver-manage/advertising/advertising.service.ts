import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"

@Injectable()
export class AdvertisingService extends BaseService<ResModel>{

  // 1 获取数据列表
  getList(params?):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ADVERTISINGS']}`,params).toPromise();
  }

  //2 获取一条数据
  getOne(id):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ADVERTISINGS']}/${id}`,{}, true).toPromise();
  }
  // 3添加一条数据
  postOne(params):Promise<ResModel> {
    let fileId=params.fileId;
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['ADVERTISINGS']}/${fileId}`, params).toPromise();
  }

  // 4 修改一条数据，提供所有字段
  putOne(id, params):Promise<any> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['ADVERTISINGS']}`, params).toPromise();
  }

// 5 删除一条数据
  deleteOne(id):Promise<any> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['ADVERTISINGS']}/${id}`).toPromise();
  }

  //6 修改状态
  patchOne(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `${BASE_URL}/${API['ADVERTISINGS']}`, params).toPromise();
  }
}
