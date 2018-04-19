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
export class AnnouncementService extends BaseService<any>{

    constructor(
        protected _httpInterceptorService: HttpInterceptorService,
        private http: Http
    ) {
        super(_httpInterceptorService);
    }

    const
    private headers = new Headers({ 'Content-Type': 'application/json' });
    apiUrl = `${TEST_URL}/${API['ANNOUNCE']}`;
    //apiUrl = `http://172.16.1.252:9080/announcements`;
    exportFile = `${TEST_URL}/${API['ANNOUNCE']}/export`;
    SPExportFile = `${TEST_URL}/${API['ANNOUNCE']}/specialExport`;
    //SPExportFile = `http://172.16.1.252:9080/announcements/specialExport`;






    // 获取数据列表
    getList(params?): Promise<ResModel> {
        return this._httpInterceptorService.request('GET', this.apiUrl, params).toPromise();
    }

    // 删除一条数据
    deleteOne(id: string | number): Promise<ResModel> {
        return this._httpInterceptorService.request('DELETE', `${this.apiUrl}/${id}`).toPromise();
    }

    // 获取一条数据
    getOne(id: string | number): Promise<ResModel> {
        return this._httpInterceptorService.request('GET', `${this.apiUrl}/${id}`).toPromise();
    }

    // 添加一条数据
    /* postOne(params): Promise<any> {
       const url = `${this.apiUrl}?access_token=${this.accessToken}`;
       return this.create(url,params);
     }*/

    // 修改一条数据，提供所有字段
    putOne(params: any): Promise<ResModel> {
        return this._httpInterceptorService.request('PUT', `${this.apiUrl}`, params).toPromise();
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
