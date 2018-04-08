import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import * as _ from "lodash";

@Injectable()
export class RedPacketService {
  accessToken=`7fbb40a8-64a1-4a44-94ae-4eee6f3d4625`;
  url=`http://172.16.1.221:9080/activities/sendRecords`;
  constructor(private _httpInterceptorService: HttpInterceptorService) {
  }
  // 获取数据列表
  getList(params?): Observable<any> {
    return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}&awardType=1`, params);
  }
}
