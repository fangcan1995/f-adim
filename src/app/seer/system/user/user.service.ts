import { Injectable } from '@angular/core';
import { RoleService } from "../role/role.service";
import {
	BaseService,
	HttpInterceptorService,
	API,
	BASE_URL,
	ResModel,
} from '../../../theme/services';
import { ResourceService } from '../resource/resource.service';
@Injectable()
export class UserService extends BaseService<any> {
  constructor(
  	protected _httpInterceptorService:HttpInterceptorService,
    private _roleService:RoleService,
    ) {
  	super(_httpInterceptorService);
    this.setApi(API['USERS']);
  }
  getRoles() {
    return this._roleService.getList({ pageSize: 10000 })
  }
  getUsersWithStaffsWithOrgs(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ROLES']}/userTree`).toPromise();
  }
  resetPassword(params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['USERS']}/password`, params).toPromise();
  }
}
