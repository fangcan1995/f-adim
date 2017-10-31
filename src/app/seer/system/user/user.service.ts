import { Injectable } from '@angular/core';
import { RoleService } from "../role/role.service";
import {
	BaseService,
	HttpInterceptorService,
	API,
	BASE_URL,
	ResModel,
} from '../../../theme/services';
@Injectable()
export class UserService extends BaseService<any> {
  constructor(
  	protected _httpInterceptorService:HttpInterceptorService,
    private roleService:RoleService,
    ) {
  	super(_httpInterceptorService);
  }
  getList(params?): Promise<ResModel> {
  	return this._httpInterceptorService.request('GET', 'http://172.16.1.234:8090/users', params).toPromise();
  }
  getOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `http://172.16.1.234:8090/users/${id}`).toPromise();
  }
  postOne(params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `http://172.16.1.234:8090/users`, params).toPromise();
  }
  putOne(id: string | number, params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `http://172.16.1.234:8090/users/${id}`, params).toPromise();
  }
  patchOne(id: string | number, params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `http://172.16.1.234:8090/users/${id}`, params).toPromise();
  }
  deleteOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `http://172.16.1.234:8090/users/${id}`).toPromise();
  }
}
