import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {BaseService, BASE_URL} from "../../../theme/services/base.service";


@Injectable()
export class TransferService extends BaseService<any>{

  constructor(
    protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
  }

  //获取列表
  public getList(params: any): Promise<any> {
    return this._httpInterceptorService.request('GET', `http://172.16.1.252:9080` + `/transfer/loan/page`, params).toPromise();
  }

}
