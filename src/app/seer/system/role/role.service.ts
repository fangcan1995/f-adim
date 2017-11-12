import { Injectable } from '@angular/core';
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
} from "../../../theme/services";
import { ResourceService } from '../resource/resource.service'
@Injectable()
export class RoleService extends BaseService<any> {
  constructor(
    protected _httpInterceptorService:HttpInterceptorService,
    private _resourceService:ResourceService
    ) {
    super(_httpInterceptorService);
    this.setApi(API['ROLES']);
  }
  getUsersWithStaffsWithOrgs(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ROLES']}/userTree`).toPromise();
  }
  getResources(params?): Promise<ResModel> {
    return this._resourceService.getList(params);
  }
}
