import { Injectable } from '@angular/core';
import { RoleService } from "../role/role.service";
import {
    BaseService,
    HttpInterceptorService,
    API,
    BASE_URL,
    ResModel,
    TEST_URL
} from '../../../theme/services';
import { ResourceService } from '../resource/resource.service';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { getStorage } from "../../../theme/libs/utils"


const exportFile = `${BASE_URL}/${API['ROLES']}/specialExport`;


@Injectable()


export class UserService extends BaseService<any> {

    constructor(
        protected _httpInterceptorService: HttpInterceptorService,
        private _roleService: RoleService,
        private http: Http
    ) {
        super(_httpInterceptorService);
        this.setApi(API['USERS']);
    }
    getRoles() {
        return this._roleService.getList({ pageSize: 10000 })
    }
    getUsersWithStaffsWithOrgs(): Promise<ResModel> {
        //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ROLES']}/userTree`).toPromise();
        return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ROLES']}/userTree`).toPromise();
    }
    resetPassword(params): Promise<ResModel> {
        //return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['USERS']}/password`, params).toPromise();
        return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['USERS']}/password`, params).toPromise();
    }


    deleteUser (params) {
        return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['USERS']}`, params).toPromise();
    }

    exportForm(params): Promise<any> {
        const access_token = getStorage({ key: 'token' }).access_token;
        return this.http.get(`${exportFile}?access_token=${access_token}`, new RequestOptions({
            responseType: ResponseContentType.Blob,
            search: params
        })).toPromise();
    }
}
