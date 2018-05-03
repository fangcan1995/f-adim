import { Injectable } from "@angular/core";
import {
    BaseService,
    HttpInterceptorService,
    API,
    BASE_URL,
    ResModel,
    TEST_URL
} from "../../../theme/services";
import { Observable } from "rxjs/Observable";

import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { getStorage } from "../../../theme/libs/utils"

import * as _ from 'lodash';

@Injectable()
export class SubjectService extends BaseService<any>{

    constructor(
        protected _httpInterceptorService: HttpInterceptorService,
        private http: Http
    ) {
        super(_httpInterceptorService);
    }

    const
    private headers = new Headers({ 'Content-Type': 'application/json' });
    // apiUrl = `${TEST_URL}/${API['ANNOUNCE']}`;
    apiUrl = `http://172.16.1.252:9080/subjects`;
    exportFile = `${TEST_URL}/${API['ANNOUNCE']}/export`;
    SPExportFile = `${TEST_URL}/${API['ANNOUNCE']}/specialExport`;
    //SPExportFile = `http://172.16.1.252:9080/announcements/specialExport`;
    access_token = "access_token=6b2dc14f-13b6-4d0f-894f-d67a074249e5"






    // 获取数据列表
    getList(params?): Promise<ResModel> {
         return this._httpInterceptorService.testRequest('GET', `${this.apiUrl}?${this.access_token}`, params).toPromise();

    }

    // 删除一条数据
    deleteOne(id: string | number): Promise<ResModel> {
        return this._httpInterceptorService.testRequest('DELETE', `${this.apiUrl}/${id}?${this.access_token}`).toPromise();
    }

    // 获取一条数据
    getOne(id: string | number): Promise<ResModel> {
        return this._httpInterceptorService.testRequest('GET', `${this.apiUrl}/${id}?${this.access_token}`).toPromise();
    }

    // 添加一条数据
    /* postOne(params): Promise<any> {
       const url = `${this.apiUrl}?access_token=${this.accessToken}`;
       return this.create(url,params);
     }*/

    // 修改一条数据，提供所有字段
    putOne(params: any): Promise<ResModel> {
        return this._httpInterceptorService.testRequest('PUT', `${this.apiUrl}?${this.access_token}`, params).toPromise();
    }

    /* 导出表格 */
    /*exportForm(params: any): Promise<ResModel> {
      return this._httpInterceptorService.request('POST', `http://172.16.4.62:8070/announcements/export`, params).toPromise();
    }*/

    exportForm(params): Promise<any> {
        const access_token = getStorage({ key: 'token' }).access_token;
        return this.http.get(`${this.exportFile}?access_token=${access_token}`, new RequestOptions({
            responseType: ResponseContentType.Blob,
            search: params
        })).toPromise();
    }

    specialExportForm(params): Promise<any> {
        const access_token = getStorage({ key: 'token' }).access_token;
        return this.http.get(`${this.SPExportFile}?access_token=${access_token}`, new RequestOptions({
            responseType: ResponseContentType.Blob,
            search: params
        })).toPromise();
    }


}
