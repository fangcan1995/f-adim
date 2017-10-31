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
}
