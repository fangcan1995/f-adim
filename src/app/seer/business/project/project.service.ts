import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {BaseService, BASE_URL} from "../../../theme/services/base.service";

@Injectable()
export class ProjectService extends BaseService<any>{

  constructor(
    protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
  }

  //获取列表
  public getList(params: any): Promise<any> {
    let url = BASE_URL + '/subject/subjects';
    return this._httpInterceptorService.request('GET', url, params).toPromise();
  }

}
