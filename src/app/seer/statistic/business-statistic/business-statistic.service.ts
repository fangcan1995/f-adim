import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    BaseService,
    HttpInterceptorService,
    API,
    BASE_URL,
    ResModel,
    TEST_URL
} from "../../../theme/services";
import { SERVER } from "../../const";
import { Headers, Http, RequestOptions, ResponseContentType, Response } from '@angular/http';
@Injectable()

export class BusiStatisticService extends BaseService<any> {
    constructor (
        protected _httpInterceptorService: HttpInterceptorService,
        private http: Http
    ) {
        super(_httpInterceptorService);
        //this.setApi
    }


    getBusiStatistic (): Promise<ResModel> {
        return this._httpInterceptorService.request('GET', `${TEST_URL}/${API['STATISTIC']}/type`, {}).toPromise();
    }
}