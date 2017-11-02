import { Injectable } from '@angular/core';
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
} from "../../../theme/services";

@Injectable()
export class RoleService extends BaseService<any> {
  constructor(
    protected _httpInterceptorService:HttpInterceptorService
    ) {
    super(_httpInterceptorService);
    this.setApi(API['ROLES']);
  }
  getList(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', 'http://172.16.1.234:8090/roles', params).toPromise();
  }
  getOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `http://172.16.1.234:8090/roles/${id}`).toPromise();
  }
  postOne(params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `http://172.16.1.234:8090/roles`, params).toPromise();
  }
  putOne(id: string | number, params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `http://172.16.1.234:8090/roles/${id}`, params).toPromise();
  }
  patchOne(id: string | number, params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `http://172.16.1.234:8090/roles/${id}`, params).toPromise();
  }
  deleteOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `http://172.16.1.234:8090/roles/${id}`).toPromise();
  }
}
