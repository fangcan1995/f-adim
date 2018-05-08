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


const exportFile = `${TEST_URL}/${API['USERS']}/specialExport1`;


@Injectable()


export class PlanService extends BaseService<any> {

    constructor(
        protected _httpInterceptorService: HttpInterceptorService,
        private _roleService: RoleService,
        private http: Http
    ) {
        super(_httpInterceptorService);
        this.setApi(API['PLAN']);
    }
    getRoles() {
        return this._roleService.getList({ pageSize: 10000 })
    }
    getUsersWithStaffsWithOrgs(): Promise<ResModel> {
        //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ROLES']}/userTree`).toPromise();
        return this._httpInterceptorService.request('GET', `${TEST_URL}/${API['ROLES']}/userTree`).toPromise();
    }
    resetPassword(params): Promise<ResModel> {
        //return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['USERS']}/password`, params).toPromise();
        return this._httpInterceptorService.request('PUT', `${TEST_URL}/${API['USERS']}/password`, params).toPromise();
    }
    // 新增一条记录
    postOne(params: any): Promise<ResModel> {
        return this._httpInterceptorService.request('POST', `${TEST_URL}/quartz`, params).toPromise();
    }
    //暂停一个任务
    putOne(params): Promise<ResModel>{
        return this._httpInterceptorService.request('PUT', `${TEST_URL}/quartz/pause`, params).toPromise();
    }
     //修改一个任务
     resetOne(params): Promise<ResModel>{
        return this._httpInterceptorService.request('PUT', `${TEST_URL}/quartz`, params).toPromise();
    }
    //恢复一个任务
    resumeOne(params): Promise<ResModel>{
        return this._httpInterceptorService.request('PUT', `${TEST_URL}/quartz/resume`, params).toPromise();
    }
    // 删除一条任务
    deleteOne(params): Promise<ResModel> {
        return this._httpInterceptorService.request('DELETE', `${TEST_URL}/quartz`,params).toPromise();
        //return this._httpInterceptorService.request('DELETE', `${dictUrl}/${id}`).toPromise();
    }
    // 获取列表
    getList(params?: any): Promise<ResModel> {
        return this._httpInterceptorService.request('GET', `${TEST_URL}/quartz/all`, params).toPromise();
    }

    // 获取详细
    getDetail(params?: any): Promise<ResModel> {
        params=JSON.parse(params)
        return this._httpInterceptorService.request('GET', `${TEST_URL}/quartz/detail`, params).toPromise();
    }
    exportForm(params): Promise<any> {
        const access_token = getStorage({ key: 'token' }).access_token;
        return this.http.get(`${exportFile}?access_token=${access_token}`, new RequestOptions({
            responseType: ResponseContentType.Blob,
            search: params
        })).toPromise();
    }
}
