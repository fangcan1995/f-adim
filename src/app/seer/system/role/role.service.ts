import { Injectable } from '@angular/core';
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
  TEST_URL
} from "../../../theme/services";
import { ResourceService } from '../resource/resource.service';
/* import { UserService } from '../user/user.service'; */

const usersUrl = 'http://172.16.1.234:9080/roles';

@Injectable()


export class RoleService extends BaseService<any> {
  constructor(
    protected _httpInterceptorService:HttpInterceptorService,
    private _resourceService:ResourceService
    ) {
    super(_httpInterceptorService);
    this.setApi(API['ROLES']);
  }

  getRoleList(params): Promise<ResModel> {
    return this._httpInterceptorService.request(
        'GET',
        `${BASE_URL}/${API['ROLES']}`,
        params
    ).toPromise();
  }

  getRoleOne(id): Promise<ResModel> {
    return this._httpInterceptorService.request(
        'GET',
        `${BASE_URL}/${API['ROLES']}/${id}`,
    ).toPromise();
  }

  getUsersWithStaffsWithOrgs(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ROLES']}/userTree`).toPromise();
  }

  getResources(params?): Promise<ResModel> {
    return this._resourceService.getList(params);
  }
}
