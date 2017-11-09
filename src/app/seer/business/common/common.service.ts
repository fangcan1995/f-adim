import { Injectable } from '@angular/core';

import {BASE_URL, BaseService} from "../../../theme/services/base.service";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {Http, RequestOptions, ResponseContentType} from "@angular/http";

@Injectable()
export class CommonService extends BaseService<any>{

  constructor(protected _httpInterceptorService: HttpInterceptorService, private _http: Http) {
    super(_httpInterceptorService);
    this.setApi('/intentions/loan');
  }

  //更新会员信息
  public updateMember(params: any): Promise<any> {
    let url = BASE_URL + `/member/members/${params["memberId"]}/baseInfo`;
    return this._httpInterceptorService.request('PUT', url, params, false).toPromise();
  }

  //查询会员信用信息（第一次获取会员信用信息）
  public getMemberCredit(memberId: string, creditType: string): Promise<any> {
    let url = BASE_URL + `/member/members/${memberId}/credits?creditType=${creditType}`;
    return this._httpInterceptorService.request('GET', url, false).toPromise();
  }

  //更新借款信息
  public updateLoan(params?): Promise<any> {
    let intentions_loan_url = 'subject/intentions/loan';
    return this._httpInterceptorService.request('PUT', BASE_URL + `/${intentions_loan_url}`, params, false).toPromise();
  }

  //设置抵押车辆
  public pawnVehicle(vehicleId: string, projectId: string): Promise<any> {
    let url = 'intentions';
    return this._httpInterceptorService.request('POST', BASE_URL + `/subject/${url}/${projectId}/pawnCar/${vehicleId}`, {}, false).toPromise();
  }

  //设置抵押房产
  public pawnHouse(houseId: string, projectId: string): Promise<any> {
    let url = 'intentions';
    return this._httpInterceptorService.request('POST', BASE_URL + `/subject/${url}/${projectId}/pawnHouse/${houseId}`, {}, false).toPromise();
  }

  //新增车辆
  public addVehicle(memberId: string, param: any): Promise<any> {
    let url = BASE_URL + `/member/members/${memberId}/vehicleInfo`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

  //新增房产
  public addHouse(memberId: string, param: any): Promise<any> {
    let url = BASE_URL + `/member/members/${memberId}/houseInfo`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

  //下载
  public downloadFile(param: any): Promise<any> {
    let url = BASE_URL + `/tool/files/download?id=${param.id}`
    return this._http.get(url, new RequestOptions({
      responseType: ResponseContentType.Blob
    })).toPromise();
  }

  //删除
  public deleteFile(id: string): Promise<any> {
    let url = BASE_URL + `/tool/files/${id}`
    return this._httpInterceptorService.request('DELETE', url, false).toPromise();
  }

  //补填资料
  public completion(param: any): Promise<any> {
    let url = BASE_URL + `/subject/intentions/${param.id}`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

  //审核
  public audit(param: any): Promise<any> {
    let url = BASE_URL + `/subject/projects/audit`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

}
