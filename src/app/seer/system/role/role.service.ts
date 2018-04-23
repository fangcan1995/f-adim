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
import { getStorage } from "../../../theme/libs/utils"
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
/* import { UserService } from '../user/user.service'; */


@Injectable()


export class RoleService extends BaseService<any> {
  constructor(
    protected _httpInterceptorService:HttpInterceptorService,
    private _resourceService:ResourceService,
    private http: Http
    ) {
    super(_httpInterceptorService);
    this.setApi(API['ROLES']);
  }

  exportFile = `${TEST_URL}/${API['ROLES']}/specialExport`;

  getRoleList(params): Promise<ResModel> {
    return this._httpInterceptorService.request(
        'GET',
        `${TEST_URL}/${API['ROLES']}`,
        params
    ).toPromise();
  }

  getRoleOne(id): Promise<ResModel> {
    return this._httpInterceptorService.request(
        'GET',
        `${TEST_URL}/${API['ROLES']}/${id}`,
    ).toPromise();
  }

  getUsersWithStaffsWithOrgs(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${TEST_URL}/${API['ROLES']}/userTree`).toPromise();
  }

  getResources(params?): Promise<ResModel> {
    return this._resourceService.getList(params);
  }

  exportForm(params): Promise<any> {
    console.log(params);
    const access_token = getStorage({ key: 'token' }).access_token;
    return this.http.get(`${this.exportFile}?access_token=${access_token}`, new RequestOptions({
        responseType: ResponseContentType.Blob,
        search: params
    })).toPromise();
}
}
