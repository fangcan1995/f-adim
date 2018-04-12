import { Injectable } from '@angular/core';
import { ResourceModel } from "./resource.model";
import { API, BaseService, HttpInterceptorService, BASE_URL, ResModel, TEST_URL } from '../../../theme/services';
import { getStorage } from "../../../theme/libs/utils"
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
@Injectable()
export class ResourceService extends BaseService<ResourceModel> {
    constructor(
        protected _httpInterceptorService: HttpInterceptorService,
        private http: Http
    ) {
        super(_httpInterceptorService);
        this.setApi(API['RESOURCES']);
    }

    exportFile = `${TEST_URL}/${API['RESOURCES']}/export`;

    getSystemList(): Promise<ResModel> {
        return this._httpInterceptorService.request('GET', `${TEST_URL}/${API['RESOURCES']}/systemList`).toPromise();
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
